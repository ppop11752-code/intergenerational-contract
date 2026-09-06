from PIL import Image, ImageDraw
from pathlib import Path
import math, random, json
root=Path('client/public/assets/ui/v1')
for s in ['terrain','landmarks','residences','ambience','frames','portraits','icons','transitions']:(root/s).mkdir(parents=True,exist_ok=True)
C={'ink':(23,18,13,255),'ink2':(42,29,18,255),'wood':(111,75,38,255),'wood2':(154,107,55,255),'parch':(243,229,191,255),'parch2':(216,192,139,255),'brass':(199,157,92,255),'forest':(49,82,58,255),'forest2':(78,117,82,255),'water':(62,100,112,255),'sky':(127,167,176,255),'warn':(168,79,61,255),'success':(71,115,74,255)}
def I(size,bg=(0,0,0,0)):return Image.new('RGBA',size,bg)
def S(im,p):im.save(root/p,'PNG')
# terrain atlas
atlas=I((256,256));d=ImageDraw.Draw(atlas);random.seed(4)
def tile(x,y,b):x0,y0=x*32,y*32;d.rectangle([x0,y0,x0+31,y0+31],fill=b);return x0,y0
for i,col in enumerate([(65,104,63,255),(71,112,67,255),(59,96,57,255)]):
 x0,y0=tile(i,0,col)
 for _ in range(18):x=x0+random.randrange(2,30);y=y0+random.randrange(2,30);d.point((x,y),fill=(91,132,76,255))
for i,col in enumerate([(124,92,58,255),(136,101,63,255)]):
 x0,y0=tile(3+i,0,col)
 for _ in range(16):x=x0+random.randrange(2,30);y=y0+random.randrange(2,30);d.point((x,y),fill=(96,68,43,255))
for i in range(2):
 x0,y0=tile(i,1,(72,113,67,255))
 for _ in range(12):x=x0+random.randrange(2,30);y=y0+random.randrange(2,30);d.rectangle([x,y,x+1,y+1],fill=random.choice([(231,191,101,255),(229,137,133,255),(214,219,177,255)]))
for i in range(2):
 x0,y0=tile(2+i,1,(52,91,111,255))
 for yy in [8,18,26]:d.line([x0+4,y0+yy,x0+14,y0+yy],fill=(91,140,151,255))
for idx in range(5):
 x,y=4+idx%4,1+idx//4;x0,y0=tile(x,y,(67,108,70,255))
 if idx==0:d.rectangle([x0,y0+18,x0+31,y0+31],fill=(52,91,111,255))
 elif idx==1:d.rectangle([x0+18,y0,x0+31,y0+31],fill=(52,91,111,255))
 elif idx==2:d.pieslice([x0+4,y0+4,x0+50,y0+50],180,270,fill=(52,91,111,255))
 elif idx==3:d.pieslice([x0-18,y0+4,x0+28,y0+50],270,360,fill=(52,91,111,255))
 else:d.rectangle([x0,y0+20,x0+31,y0+31],fill=(156,134,87,255))
for idx in range(8):
 x0,y0=tile(idx,3,(67,108,70,255));pc=(135,116,82,255) if idx<4 else (128,93,58,255);k=idx%4
 if k==0:d.rectangle([x0+13,y0,x0+18,y0+31],fill=pc)
 elif k==1:d.rectangle([x0+13,y0,x0+18,y0+18],fill=pc);d.rectangle([x0+13,y0+13,x0+31,y0+18],fill=pc)
 elif k==2:d.rectangle([x0+13,y0,x0+18,y0+31],fill=pc);d.rectangle([x0+13,y0+13,x0+31,y0+18],fill=pc)
 else:d.rectangle([x0+13,y0,x0+18,y0+31],fill=pc);d.rectangle([x0,y0+13,x0+31,y0+18],fill=pc)
x0,y0=tile(0,4,(67,108,70,255));d.polygon([(x0+8,y0+24),(x0+12,y0+12),(x0+22,y0+9),(x0+26,y0+24)],fill=(102,103,95,255))
x0,y0=tile(1,4,(67,108,70,255));
for cx,cy in [(10,20),(17,14),(23,20)]:d.ellipse([x0+cx-6,y0+cy-6,x0+cx+6,y0+cy+6],fill=(46,85,52,255))
for x,h in [(2,10),(3,8),(4,6)]:
 x0,y0=tile(x,4,(67,108,70,255));d.rectangle([x0+14,y0+20,x0+18,y0+30],fill=(105,72,43,255));d.polygon([(x0+16,y0+h),(x0+6,y0+24),(x0+26,y0+24)],fill=(40,81,47,255))
x0,y0=tile(5,4,(67,108,70,255));d.rectangle([x0+13,y0+15,x0+18,y0+28],fill=(102,72,46,255));d.line([x0+15,y0+18,x0+8,y0+10],fill=(102,72,46,255),width=2);d.line([x0+17,y0+20,x0+24,y0+12],fill=(102,72,46,255),width=2)
for x in [6,7]:x0,y0=tile(x,4,(67,108,70,255));d.rectangle([x0+(x-6)*8,y0,x0+31,y0+31],fill=(80,120,75,255))
S(atlas,'terrain/terrain_atlas.png')

def building(size,roof,wall,civic=False):
 im=I(size);d=ImageDraw.Draw(im);w,h=size;d.rectangle([int(w*.18),int(h*.69),int(w*.82),int(h*.80)],fill=(0,0,0,60));d.rectangle([int(w*.22),int(h*.42),int(w*.78),int(h*.72)],fill=wall);d.polygon([(int(w*.14),int(h*.45)),(int(w*.5),int(h*.18)),(int(w*.86),int(h*.45))],fill=roof)
 if civic:d.rectangle([int(w*.46),int(h*.05),int(w*.54),int(h*.22)],fill=C['brass']);d.rectangle([int(w*.48),0,int(w*.52),int(h*.08)],fill=C['brass'])
 d.rectangle([int(w*.46),int(h*.55),int(w*.55),int(h*.72)],fill=C['ink2'])
 for xx in (.31,.64):d.rectangle([int(w*xx),int(h*.50),int(w*(xx+.08)),int(h*.58)],fill=C['sky'])
 return im
S(building((160,160),(102,54,34,255),(184,157,113,255),True),'landmarks/government.png')
g=I((160,160));gd=ImageDraw.Draw(g)
for r,a in [(75,25),(60,40),(45,60)]:gd.ellipse([80-r,80-r,80+r,80+r],outline=(180,65,52,a),width=3)
S(g,'landmarks/government_turn_glow.png')
S(building((64,64),(99,67,42,255),(145,118,80,255)),'residences/poor.png');S(building((64,64),(105,63,42,255),(169,147,108,255)),'residences/middle.png');S(building((64,64),(83,53,43,255),(194,175,140,255)),'residences/noble.png')
m=I((24,24));md=ImageDraw.Draw(m);md.polygon([(12,2),(22,10),(12,22),(2,10)],fill=C['success'],outline=C['parch']);S(m,'residences/local_marker.png')
f=I((256,64));fd=ImageDraw.Draw(f)
for x in range(256):fd.line([(x,0),(x,63)],fill=(24,25,27,int(220*(1-x/255))))
S(f,'ambience/fog_edge.png')

def frame(kind):
 im=I((96,96));d=ImageDraw.Draw(im);maps={'parchment':(C['parch'],C['wood'],C['parch2']),'wood':(C['wood'],C['ink'],C['wood2']),'dark':(C['ink2'],C['brass'],C['ink']),'tooltip':((38,31,22,245),C['brass'],C['ink2'])};fill,edge,inner=maps[kind];d.rectangle([3,3,92,92],fill=fill,outline=edge,width=3);d.rectangle([8,8,87,87],outline=inner,width=2)
 for x,y in [(3,3),(84,3),(3,84),(84,84)]:d.rectangle([x,y,x+9,y+9],fill=edge)
 return im
for n,k in [('parchment_panel','parchment'),('wood_panel','wood'),('dark_panel','dark'),('tooltip','tooltip')]:S(frame(k),f'frames/{n}.png')
def button(fill):
 im=I((96,96));d=ImageDraw.Draw(im);d.rectangle([5,24,90,72],fill=fill,outline=C['brass'],width=3);d.rectangle([9,28,86,68],outline=C['ink'],width=2);return im
for n,c in [('button_primary',C['wood2']),('button_secondary',C['wood']),('button_danger',C['warn']),('tab_active',C['brass']),('tab_idle',C['ink2'])]:S(button(c),f'frames/{n}.png')
icons=['round','year','population','inflation','debt','event','chronicle','settings','government','home','zoom_in','zoom_out','market','recovery','support','birth','marriage','status','cash','resource_renewable','resource_nonrenewable','queue','reconnect','info','close','accept','reject','cancel','end_turn']
def mkicon(name):
 im=I((24,24));d=ImageDraw.Draw(im);fg=C['parch'];ac=C['brass']
 if name in ('round','year'):d.ellipse([4,4,19,19],outline=fg,width=2);d.line([12,12,12,6],fill=ac,width=2);d.line([12,12,17,14],fill=ac,width=2)
 elif name=='population':
  [d.ellipse([cx-3,4,cx+3,10],fill=fg) for cx in [8,16]];d.rectangle([4,12,20,19],fill=fg)
 elif name=='inflation':d.line([4,18,10,12,14,15,20,6],fill=ac,width=2);d.polygon([(17,6),(21,6),(20,10)],fill=ac)
 elif name=='debt':d.rectangle([4,6,20,18],outline=fg,width=2);d.line([6,10,18,10],fill=ac,width=2)
 elif name=='event':d.polygon([(12,3),(20,20),(4,20)],outline=fg);d.line([12,8,12,14],fill=ac,width=2);d.point((12,17),fill=ac)
 elif name=='chronicle':d.rectangle([5,4,19,20],outline=fg,width=2);d.line([8,8,16,8],fill=ac);d.line([8,12,16,12],fill=ac)
 elif name=='settings':d.ellipse([7,7,17,17],outline=fg,width=2);[d.rectangle([12+int(8*math.cos(math.radians(a)))-1,12+int(8*math.sin(math.radians(a)))-1,12+int(8*math.cos(math.radians(a)))+1,12+int(8*math.sin(math.radians(a)))+1],fill=ac) for a in range(0,360,45)]
 elif name in ('government','home'):d.polygon([(4,11),(12,4),(20,11)],fill=ac);d.rectangle([6,11,18,20],fill=fg)
 elif name.startswith('zoom_'):d.ellipse([4,4,15,15],outline=fg,width=2);d.line([14,14,20,20],fill=fg,width=2);d.line([7,10,13,10],fill=ac,width=2);name=='zoom_in' and d.line([10,7,10,13],fill=ac,width=2)
 elif name=='market':d.rectangle([4,8,20,20],outline=fg,width=2);d.polygon([(3,8),(6,4),(18,4),(21,8)],fill=ac)
 elif name=='recovery':d.arc([4,4,20,20],30,300,fill=fg,width=2);d.polygon([(17,3),(21,7),(16,8)],fill=ac)
 elif name=='support':d.polygon([(12,20),(4,11),(5,7),(9,6),(12,9),(15,6),(19,7),(20,11)],fill=ac)
 elif name=='birth':d.ellipse([7,4,17,14],outline=fg,width=2);d.rectangle([10,14,14,20],fill=ac)
 elif name=='marriage':d.ellipse([3,6,12,15],outline=fg,width=2);d.ellipse([12,6,21,15],outline=ac,width=2)
 elif name=='status':d.polygon([(12,3),(15,9),(21,10),(16,14),(17,21),(12,17),(7,21),(8,14),(3,10),(9,9)],fill=ac)
 elif name=='cash':d.rectangle([5,5,19,19],outline=fg,width=2);d.line([12,7,12,17],fill=ac,width=2);d.line([9,9,15,9],fill=ac);d.line([9,15,15,15],fill=ac)
 elif name=='resource_renewable':d.arc([5,5,19,19],45,300,fill=fg,width=2);d.polygon([(15,3),(20,6),(16,9)],fill=ac)
 elif name=='resource_nonrenewable':d.polygon([(5,18),(8,7),(15,4),(20,10),(17,19)],fill=fg)
 elif name=='queue':
  [d.ellipse([4,y,8,y+4],fill=fg) or d.line([10,y+2,20,y+2],fill=ac,width=2) for y in [5,10,15]]
 elif name=='reconnect':d.arc([4,4,20,20],45,315,fill=fg,width=2);d.polygon([(16,3),(21,6),(17,10)],fill=ac)
 elif name=='info':d.ellipse([4,4,20,20],outline=fg,width=2);d.line([12,10,12,17],fill=ac,width=2);d.point((12,7),fill=ac)
 elif name in ('close','cancel','reject'):d.line([5,5,19,19],fill=C['warn'],width=3);d.line([19,5,5,19],fill=C['warn'],width=3)
 elif name=='accept':d.line([4,13,9,18,20,5],fill=C['success'],width=3)
 elif name=='end_turn':d.rectangle([5,5,15,19],outline=fg,width=2);d.line([11,12,21,12],fill=ac,width=2);d.polygon([(18,8),(22,12),(18,16)],fill=ac)
 return im
for n in icons:S(mkicon(n),f'icons/{n}.png')
hair=[(75,48,35,255),(42,37,32,255),(138,79,43,255),(188,159,105,255),(93,67,101,255),(61,74,92,255),(160,86,82,255),(86,104,67,255)];skin=[(221,169,127,255),(199,144,106,255),(237,187,145,255),(185,126,92,255)]
for i in range(8):
 im=I((96,96));d=ImageDraw.Draw(im);d.rectangle([20,68,76,94],fill=[C['forest2'],C['water'],C['wood2'],C['warn']][i%4]);sk=skin[i%4];d.rectangle([30,24,66,68],fill=sk);d.rectangle([26,32,70,54],fill=sk);hc=hair[i];d.rectangle([26,18,70,35],fill=hc);d.rectangle([24,28,31,55],fill=hc) if i%2==0 else d.rectangle([65,25,72,58],fill=hc);d.rectangle([36,43,39,46],fill=C['ink']);d.rectangle([57,43,60,46],fill=C['ink']);d.line([44,57,52,57],fill=(130,72,65,255));d.rectangle([42,68,54,74],fill=C['brass']);S(im,f'portraits/base_{i+1:02d}.png')
def cloud(v):
 im=I((64,32));d=ImageDraw.Draw(im);col=(220,226,215,120);o=v*3
 for b in [(6+o,12,30+o,26),(20,5,46,26),(34-o,11,60-o,27)]:d.ellipse(b,fill=col)
 return im
S(cloud(0),'ambience/cloud_01.png');S(cloud(1),'ambience/cloud_02.png')
b=I((32,16));bd=ImageDraw.Draw(b);bd.line([3,10,10,5,16,9,22,5,29,10],fill=C['ink'],width=2);S(b,'ambience/bird_01.png')
s=I((32,64));sd=ImageDraw.Draw(s)
for box,a in [((12,44,24,58),90),((8,28,22,44),70),((13,10,28,28),45)]:sd.ellipse(box,fill=(190,190,180,a))
S(s,'ambience/smoke_01.png')
r=I((48,24));rd=ImageDraw.Draw(r);rd.ellipse([4,8,44,18],outline=(133,187,195,140));rd.ellipse([12,10,36,16],outline=(155,203,209,120));S(r,'ambience/water_ripple_01.png')
for n,c in [('crisis_drought',(189,152,75,55)),('crisis_fiscal',(146,52,44,45))]:S(I((256,256),c),f'ambience/{n}.png')
seal=I((96,96));sd=ImageDraw.Draw(seal);sd.ellipse([12,12,84,84],fill=(151,63,46,255),outline=C['brass'],width=4);sd.polygon([(48,23),(57,42),(78,45),(62,59),(66,79),(48,69),(30,79),(34,59),(18,45),(39,42)],fill=C['brass']);S(seal,'transitions/founder_seal.png')
div=I((256,32));dd=ImageDraw.Draw(div);dd.line([8,16,248,16],fill=C['brass'],width=2);dd.polygon([(128,6),(138,16),(128,26),(118,16)],fill=C['wood2'],outline=C['brass']);S(div,'transitions/round_divider.png')
e=I((96,96));ed=ImageDraw.Draw(e);ed.ellipse([24,15,72,63],fill=(222,211,179,255),outline=C['ink'],width=3);ed.rectangle([30,55,66,78],fill=(222,211,179,255));ed.rectangle([35,36,43,44],fill=C['ink']);ed.rectangle([53,36,61,44],fill=C['ink']);ed.polygon([(48,48),(43,56),(53,56)],fill=C['ink']);S(e,'transitions/extinction_mark.png')
print('png',len(list(root.rglob('*.png'))))
