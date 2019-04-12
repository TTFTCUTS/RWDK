(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isk=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isj)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="k"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="C"){processStatics(init.statics[b1]=b2.C,b3)
delete b2.C}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=b7[g],e
if(typeof f=="string")e=b7[++g]
else{e=f
f=b8}var d=[b6[b8]=b6[f]=e]
e.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){e=b7[g]
if(typeof e!="function")break
if(!b9)e.$stubName=b7[++g]
d.push(e)
if(e.$stubName){b6[e.$stubName]=e
c0.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b7[g]
var a0=b7[g]
b7=b7.slice(++g)
var a1=b7[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b7[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b7[2]
if(typeof b0=="number")b7[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b7,b9,b8,a9)
b6[b8].$getter=e
e.$getterStub=true
if(b9){init.globalFunctions[b8]=e
c0.push(a0)}b6[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}var b2=b7.length>b1
if(b2){d[0].$reflectable=1
d[0].$reflectionInfo=b7
for(var c=1;c<d.length;c++){d[c].$reflectable=2
d[c].$reflectionInfo=b7}var b3=b9?init.mangledGlobalNames:init.mangledNames
var b4=b7[b1]
var b5=b4
if(a0)b3[a0]=b5
if(a4)b5+="="
else if(!a5)b5+=":"+(a2+a7)
b3[b8]=b5
d[0].$reflectionName=b5
d[0].$metadataIndex=b1+1
if(a7)b6[b4+"*"]=d[0]}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.fK"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.fK"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.fK(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aI=function(){}
var dart=[["","",,S,{"^":"",
rB:function(){C.e.cn($.$get$cP(),new S.rC())
C.e.cn($.$get$cO(),new S.rD())
C.e.cn($.$get$dA(),new S.rE())},
BN:[function(){var z,y,x,w,v,u
S.rB()
S.rT()
z=S.bL(!1)
y=z.a
J.br(y.h(0,"scale"))
H.q(y.h(0,"scale"),"$isaj").ch=10
J.br(y.h(0,"fillColor"))
J.br(y.h(0,"lineColor"))
$.dD=new S.cf(z,0,0,0)
x=S.bL(!1)
y=x.a
J.br(y.h(0,"scale"))
H.q(y.h(0,"scale"),"$isaj").ch=10
J.br(y.h(0,"fillColor"))
J.br(y.h(0,"lineColor"))
$.dE=new S.cf(x,10,0,0)
w=S.bL(!1)
y=w.a
J.br(y.h(0,"scale"))
H.q(y.h(0,"scale"),"$isaj").ch=10
J.br(y.h(0,"fillColor"))
J.br(y.h(0,"lineColor"))
$.dF=new S.cf(w,20,0,0)
S.U(document.querySelector("#blockaddbutton"),new S.x7())
S.U(document.querySelector("#blockloadbutton"),new S.x8())
S.U(document.querySelector("#blocksavebutton"),new S.x9())
S.U(document.querySelector("#idbutton"),new S.xk())
S.U(document.querySelector("#idreorderbutton_ok"),new S.xv())
S.U(document.querySelector("#idreorderbutton_cancel"),new S.xw())
S.U(document.querySelector("#blockclearbutton"),new S.xx())
y=document.querySelector("#blockloadinput")
J.a7(y,"change",new S.xy(),null)
S.U(document.querySelector("#shapeaddbutton"),new S.xz())
S.U(document.querySelector("#shapeloadbutton"),new S.xA())
S.U(document.querySelector("#shapesavebutton"),new S.xB())
S.U(document.querySelector("#shapeclearbutton"),new S.xa())
y=document.querySelector("#shapeloadinput")
J.a7(y,"change",new S.xb(),null)
S.U(document.querySelector("#factionaddbutton"),new S.xc())
S.U(document.querySelector("#factionloadbutton"),new S.xd())
S.U(document.querySelector("#factionsavebutton"),new S.xe())
S.U(document.querySelector("#factionclearbutton"),new S.xf())
y=document.querySelector("#factionloadinput")
J.a7(y,"change",new S.xg(),null)
S.U(document.querySelector("#regionaddbutton"),new S.xh())
S.U(document.querySelector("#regionloadbutton"),new S.xi())
S.U(document.querySelector("#regionsavebutton"),new S.xj())
S.U(document.querySelector("#regionclearbutton"),new S.xl())
y=document.querySelector("#regionloadinput")
J.a7(y,"change",new S.xm(),null)
S.U(document.querySelector("#shiploadbutton"),new S.xn())
S.U(document.querySelector("#shipclearbutton"),new S.xo())
S.U(document.querySelector("#shiprefreshbutton"),new S.xp())
y=document.querySelector("#shiploadinput")
J.a7(y,"change",new S.xq(),null)
S.U(document.querySelector("#alertbutton"),new S.xr())
S.U(document.querySelector("#confirmbuttonno"),new S.xs())
S.d8("blockstab","blocks")
S.d8("shapesstab","shapes")
S.d8("factionstab","factions")
S.d8("regionstab","regions")
S.d8("shipstab","ships")
S.kR(document.querySelector("#blockstab"))
$.aH=S.dQ("databank","blocks")
y=S.dQ("shapelist","shapes")
y.r=new S.xt()
$.bx=y
$.by=S.dQ("factionlist","factions")
$.be=S.dQ("regionlist","regionsbox")
$.by.r=new S.xu()
y=new S.t8(400,null,null)
v=W.ev(null,null)
v.className="starchart"
u=J.f(v)
u.sap(v,400)
u.sar(v,400)
y.b=v
y.c=J.em(v,"2d")
$.cb=y
document.querySelector("#regionsbox").appendChild($.cb.b)
y=$.cb
v=y.c
u=y.a
J.aS(v,0,0,u,u)
y.bx(0,5,16)},"$0","jz",0,0,6],
qE:function(a){S.d5(a,new S.qF(),null,!1)},
qS:function(a){S.d5(a,new S.qT(),null,!1)},
qI:function(a){S.d5(a,new S.qJ(),null,!1)},
qN:function(a){S.d5(a,new S.qO(),new S.qP(),!1)},
qW:function(a){S.d5(a,new S.qX(),null,!0)},
d5:function(a,b,c,d){var z
if(!J.h2(J.am(a),".lua")){S.bw("File Parsing Failed:","Please select a .lua file.")
return}z=new FileReader()
z.readAsText(a)
C.I.L(z,"load",new S.qM(a,b,c,d),null)},
r2:function(a,b){var z,y,x,w,v,u,t
z={}
v=a
u=$.f0
a=J.dn(v,"-- "+u,u)
a=H.aJ(a,$.$get$jo(),new S.r5(),null)
a=J.mv(a,J.hc(a,"{"),J.mi(a,"}")+1)
if(!J.dp(a,"{")||!J.h2(a,"}")){P.cD("NOPE: not within braces!")
return}a=H.aJ(a,$.$get$js(),new S.r6(),null)
a=H.aJ(a,$.$get$ji(),new S.r7(),null)
if(b){z.a=0
a=H.aJ(a,$.$get$jj(),new S.rb(z),null)}a=H.aJ(a,$.$get$jh(),new S.rc(),null)
a=H.aJ(a,$.$get$jm(),new S.rd(),null)
a=H.aJ(a,$.$get$jg(),new S.re(),null)
a=H.aJ(a,$.$get$jq(),new S.rf(),null)
a=H.aJ(a,$.$get$jn(),new S.rg(),null)
z.b=0
a=H.aJ(a,$.$get$jk(),new S.rh(z),null)
a=H.aJ(a,$.$get$f6(),new S.ri(),null)
a=H.aJ(a,$.$get$jp(),new S.r8(),null)
a=H.aJ(a,$.$get$jr(),new S.r9(),null)
a=H.aJ(a,$.$get$f6(),new S.ra(),null)
y=new P.pw(null)
x=null
try{x=P.vf(a,y.gi0())}catch(t){z=H.a3(t)
w=z
S.bw("File Parsing Failed:",w)
return}return x},
qG:function(a){J.cc(a,new S.qH())},
qU:function(a){J.cc(a,new S.qV())},
qK:function(a){J.cc(a,new S.qL())},
qQ:function(a){var z,y,x,w,v
z=J.N(a)
if(z.gR(a)!==!0&&z.H(a,"0")===!0&&!!J.r(z.h(a,"0")).$isB){y=z.h(a,"0")
z=J.f(y)
if(z.H(y,"subregions")===!0){x=z.h(y,"subregions")
if(J.a6(z.gk(y),1))S.bw("Warning!","Superregion tags detected! Region loading currently doesn't support tags outside the subregions block, so saving this file may lose data compared to what you put in! Use at your own risk!")}else x=z.H(y,"ident")===!0?a:y}else x=a
J.cc(x,new S.qR())
z=$.cb
w=z.c
v=z.a
J.aS(w,0,0,v,v)
z.bx(0,5,16)
z.c_(null)},
qY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=S.rW(J.am(a))
y=J.f(b)
if(y.H(b,"blocks")!==!0){S.bw("Invalid Ship File","The loaded file does not contain a blocks section.")
return}for(x=J.a5(J.h6(y.h(b,"blocks"))),w=z.r,v=z.f;x.l();){u=x.gp()
t=J.ad(y.h(b,"blocks"),u)
s=P.as()
for(r=J.f(t),q=J.a5(r.gI(t)),p=-1,o=0,n=0,m=0;q.l();){l=q.gp()
k=r.h(t,l)
j=J.r(l)
if(j.S(l,"blockid"))p=typeof k==="string"?H.a1(k,null,new S.qZ()):k
else if(j.S(l,"pos")){j=J.r(k)
if(!!j.$isB){if(j.H(k,"0")===!0){i=j.h(k,"0")
o=typeof i==="string"?H.af(j.h(k,"0"),new S.r_()):j.h(k,"0")}if(j.H(k,"1")===!0){i=j.h(k,"1")
n=typeof i==="string"?H.af(j.h(k,"1"),new S.r0()):j.h(k,"1")}}}else if(j.S(l,"rotation"))m=typeof k==="string"?H.af(k,new S.r1()):k
else s.i(0,l,k)}h=new S.rX(p,o,n,m,s)
v.push(h)
if(!w.M(0,h.a))w.F(0,h.a)}z.ay(0)},
fg:function(a){var z=a.a+="-- This file was generated by the Reassembly Web Development Kit (RWDK)\n"
z+="-- RWDK is an independent project and in no way affiliated with Anisoptera Games.\n"
a.a=z
z+="-- RWDK was written by TTFTCUTS\n"
a.a=z
a.a=z+"\n"},
jD:function(a,b){var z,y,x,w,v,u
z=new P.bn("")
S.fg(z)
z.a+="{\n"
for(y=a.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){J.hg(y[w],z,1)
z.a+="\n"}y=z.a+="}\n"
v=y.charCodeAt(0)==0?y:y
u=W.dr(null)
y=J.f(u)
y.sbi(u,"data:text/plain;charset=utf-8,"+P.fo(C.q,v,C.p,!1))
y.sdz(u,b+".lua")
document.body.appendChild(u)
y.b4(u)
y.bJ(u)},
rJ:function(){var z,y,x,w,v,u,t,s,r
z=new P.bn("")
S.fg(z)
y=$.be.c
x=y.length
w=x>1&&!0
if(w){v=z.a+="{\n"
z.a=v+"\tsubregions={\n"}for(u=0;u<y.length;y.length===x||(0,H.x)(y),++u){t=y[u]
J.hg(t,z,w?2:0)
z.a+="\n"}if(w){y=z.a+="\t}\n"
z.a=y+"}\n"}y=z.a
s=y.charCodeAt(0)==0?y:y
r=W.dr(null)
y=J.f(r)
y.sbi(r,"data:text/plain;charset=utf-8,"+P.fo(C.q,s,C.p,!1))
y.sdz(r,"regions.lua")
document.body.appendChild(r)
y.b4(r)
y.bJ(r)},
rK:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new P.bn("")
S.fg(z)
y=z.a+="{\n"
z.a=y+"\tblocks={\n"
for(y=a.f,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){v=y[w]
u="{"+H.e(v.a)
if(!J.y(v.b,0)||!J.y(v.c,0))u+=", {"+H.e(v.b)+", "+H.e(v.c)+"}"
t=v.d
if(!J.y(t,0))u+=", "+H.e(t)
t=v.e
if(!t.gR(t))for(s=t.gI(t),s=s.gA(s);s.l();){r=s.gp()
q=t.h(0,r)
p=J.r(q)
if(!!p.$isB){p=p.v(q)
o=H.ed(p,":","=")}else o=p.v(q)
u+=", "+H.e(r)+"="+H.e(o)}S.ai(z,u+"},",3,!0)}y=z.a+="\t}\n"
y+="}\n"
z.a=y
n=y.charCodeAt(0)==0?y:y
y=H.e(a.x)+"_"
x=a.y
x.toString
H.b1("_")
m=y+H.ed(x," ","_")+".lua"
l=W.dr(null)
x=J.f(l)
x.sbi(l,"data:text/plain;charset=utf-8,"+P.fo(C.q,n,C.p,!1))
x.sdz(l,m)
document.body.appendChild(l)
x.b4(l)
x.bJ(l)
a.Q=!1
a.a1(0)},
rS:function(){var z,y,x,w,v
z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.b4])
z.av(0,$.$get$fj())
for(y=$.bx.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){v=y[w]
z.i(0,H.e(J.ej(v)),v)}return z},
rT:function(){var z,y,x
for(z=$.$get$dX(),y=0;y<67;++y){x=z[y]
$.$get$fj().i(0,x.a,x)}C.e.cn($.$get$dX(),new S.rU())},
L:function(a,b,c,d,e,a0,a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.T(e,c)
y=J.T(a0,d)
x=J.a_(z)
w=J.a_(y)
v=J.G(x.Y(z,z),w.Y(y,y))
if(typeof v!=="number")H.F(H.I(v))
u=C.a.cK(Math.sqrt(v)*1e4)/1e4
t=P.S(1,C.a.aq(Math.floor(u)))
if(t>=5&&C.a.bM(t,2)===1){t=C.a.aq(Math.ceil(t/2))
a4=2}s=J.u(J.G(c,e),0.5)
r=J.u(J.G(d,a0),0.5)
q=x.aM(z,u)*a4
p=w.aM(y,u)*a4
o=w.aM(y,u)
n=J.bf(x.ci(z),u)
if(a3){o*=-1
n*=-1}for(x=b-1,w=(t-1)*0.5,v=w*q,m=J.Y(s),w*=p,l=J.Y(r),k=o*o+n*n,j=0;j<t;++j){i=J.G(m.ac(s,v),q*j)
h=J.G(l.ac(r,w),p*j)
g=a.e
if(x<0||x>=g.length)return H.b(g,x)
g=g[x]
f=new S.aX(a2,null,0,null,null)
f.a=J.ay(i)
f.b=J.ay(h)
u=Math.sqrt(k)
i=new S.n(null,null)
i.a=C.d.j(o/u)
i.b=C.d.j(n/u)
f.d=i
i=a.e
if(x>=i.length)return H.b(i,x)
f.e=i[x].length
g.push(f)}},
aG:function(a,b,c,d,e,f,g,h,i,j){var z,y,x,w,v,u,t,s
z=i?1:b
y=-c*0.5*z
x=c*0.5*z
w=-d*0.5*z
v=d*0.5*z
u=a.d
t=b-1
if(t<0||t>=u.length)return H.b(u,t)
u=u[t]
s=new S.n(null,null)
s.a=C.a.j(y)
s.b=C.a.j(w)
J.p(u,s)
s=a.d
if(t>=s.length)return H.b(s,t)
s=s[t]
u=new S.n(null,null)
u.a=C.a.j(y)
u.b=C.a.j(v)
J.p(s,u)
u=a.d
if(t>=u.length)return H.b(u,t)
u=u[t]
s=new S.n(null,null)
s.a=C.a.j(x)
s.b=C.a.j(v)
J.p(u,s)
s=a.d
if(t>=s.length)return H.b(s,t)
s=s[t]
u=new S.n(null,null)
u.a=C.a.j(x)
u.b=C.a.j(w)
J.p(s,u)
u=P.a0(c,d)
s=a.Q
if(t>=20)return H.b(s,t)
s[t]=u*z
if(f!=null)if(j)a.al(b,f,y,0,-1,0)
else S.L(a,b,y,v,y,w,!0,f,!1,1)
if(g!=null)if(j)a.al(b,g,x,0,1,0)
else S.L(a,b,x,w,x,v,!0,g,!1,1)
if(h!=null)if(j)a.al(b,h,0,w,0,-1)
else S.L(a,b,y,w,x,w,!0,h,!1,1)
if(e!=null)if(j)a.al(b,e,0,v,0,1)
else S.L(a,b,x,v,y,v,!0,e,!1,1)},
b_:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(d)if(b>1){z=b-1
y=!1}else{z=b
y=!0}else{z=b
y=!1}x=6.283185307179586/c
w=x*0.5
v=z*0.5/Math.sin(H.P(w))
if(y)v=0.5/Math.cos(H.P(w))
w=Math.cos(H.P(w))
u=a.Q
t=b-1
if(t<0||t>=20)return H.b(u,t)
u[t]=v*w*2
for(s=0;s<c;++s){r=x*(s-0.5)+3.141592653589793
w=Math.sin(r)
u=Math.cos(r)
q=a.d
if(t>=q.length)return H.b(q,t)
q=q[t]
p=new S.n(null,null)
p.a=C.d.j(v*u)
p.b=C.d.j(v*w)
J.p(q,p)}w=a.d
if(t>=w.length)return H.b(w,t)
o=w[t]
w=J.N(o)
u=c/2|0
s=0
while(!0){t=w.gk(o)
if(typeof t!=="number")return H.C(t)
if(!(s<t))break
c$0:{n=w.h(o,s)
m=s+1
t=w.gk(o)
if(typeof t!=="number")return H.C(t)
l=w.h(o,C.c.bM(m,t))
if(s!==u&&e)break c$0
t=J.f(n)
q=J.f(l)
S.L(a,b,t.gn(n),t.gm(n),q.gn(l),q.gm(l),!0,f,!1,1)}s=m}},
bm:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s
z=c/360*2*3.141592653589793*0.5
y=Math.cos(H.P(z))*b
x=Math.sin(H.P(z))*b
w=y*0.5
z=a.r
v=b-1
u=new S.n(null,null)
u.a=C.c.j(0)
u.b=C.d.j(-y/6)
if(v<0||v>=20)return H.b(z,v)
z[v]=u
u=-w
z=-x
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
s=new S.n(null,null)
s.a=C.a.j(u)
s.b=C.a.j(z)
J.p(t,s)
s=a.d
if(v>=s.length)return H.b(s,v)
s=s[v]
t=new S.n(null,null)
t.a=C.a.j(u)
t.b=C.a.j(x)
J.p(s,t)
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
s=new S.n(null,null)
s.a=C.a.j(w)
s.b=C.c.j(0)
J.p(t,s)
s=a.r
t=new S.n(null,null)
t.a=C.d.j(-(y/3)*0.5)
t.b=C.c.j(0)
s[v]=t
a.Q[v]=w*(0.6+x*0.5/b)
if(f)a.al(b,e,u,0,-1,0)
else S.L(a,b,u,x,u,z,!0,e,!1,1)
if(d){S.L(a,b,u,z,w,0,!0,C.b,!1,1)
S.L(a,b,w,0,u,x,!0,C.b,!1,1)}},
dW:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=b*0.5
y=b/Math.tan(H.P(c/360*2*3.141592653589793))*0.5
x=d?-z:z
w=a.r
v=b-1
u=new S.n(null,null)
u.a=C.d.j(x/3)
u.b=C.d.j(y/3)
if(v<0||v>=20)return H.b(w,v)
w[v]=u
a.Q[v]=b*(z/y)
u=-y
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.a.j(x)
t.b=C.d.j(u)
J.p(w,t)
t=-z
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
s=new S.n(null,null)
s.a=C.a.j(t)
s.b=C.d.j(y)
J.p(w,s)
s=a.d
if(v>=s.length)return H.b(s,v)
v=s[v]
s=new S.n(null,null)
s.a=C.a.j(z)
s.b=C.d.j(y)
J.p(v,s)
S.L(a,b,t,y,x,u,!0,C.b,!1,1)
S.L(a,b,x,u,z,y,!0,C.b,!1,1)
S.L(a,b,z,y,t,y,!0,C.b,!1,1)},
kK:function(a,b,c){var z,y,x,w,v,u
z=c/360*2*3.141592653589793*0.5
y=Math.sin(H.P(z))*b
x=Math.cos(H.P(z))*b
z=P.a0(y,x)
w=a.Q
v=b-1
if(v<0||v>=20)return H.b(w,v)
w[v]=z*2*0.9
z=-x
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.a.j(z)
u.b=C.c.j(0)
J.p(w,u)
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
w=new S.n(null,null)
w.a=C.c.j(0)
w.b=C.a.j(y)
J.p(u,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.a.j(x)
u.b=C.c.j(0)
J.p(w,u)
u=-y
w=a.d
if(v>=w.length)return H.b(w,v)
v=w[v]
w=new S.n(null,null)
w.a=C.c.j(0)
w.b=C.a.j(u)
J.p(v,w)
S.L(a,b,z,0,0,y,!0,C.b,!0,1)
S.L(a,b,0,y,x,0,!0,C.b,!0,1)
S.L(a,b,x,0,0,u,!0,C.b,!0,1)
S.L(a,b,0,u,z,0,!0,C.b,!0,1)},
b9:function(a,b,c,d,e,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=d/360*2*3.141592653589793
y=-0.5*b
x=-0.25*b
w=a.d
v=b-1
if(v<0||v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.d.j(y)
u.b=C.d.j(x)
J.p(w,u)
u=0.25*b
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.d.j(y)
t.b=C.d.j(u)
J.p(w,t)
S.L(a,b,y,u,y,x,!0,e?C.o:C.b,!1,1)
s=P.a0(b,(b*0.5+Math.sin(H.P(z*c*0.5))/b*2)*0.5*b)
y=a.Q
if(v>=20)return H.b(y,v)
y[v]=s
for(y=0.5*b,x=c*0.5*z,r=0;r<=c;++r){q=x-r*z
p=Math.sin(q)*b
o=Math.cos(q)*b
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.a.j(o-y)
t.b=C.a.j(p)
J.p(w,t)
w=r===0
if(w){n=(o-b)*0.5
m=(p+u)*0.5
t=-n
l=a.e
if(v>=l.length)return H.b(l,v)
l=l[v]
k=new S.aX(C.b,null,0,null,null)
k.a=C.a.j(n)
k.b=C.a.j(m)
j=Math.sqrt(m*m+t*t)
i=new S.n(null,null)
i.a=C.d.j(m/j)
i.b=C.d.j(t/j)
k.d=i
i=a.e
if(v>=i.length)return H.b(i,v)
k.e=i[v].length
l.push(k)}else if(r===c){n=(o-b)*0.5
m=(p-u)*0.5
t=-n
l=a.e
if(v>=l.length)return H.b(l,v)
l=l[v]
k=new S.aX(C.b,null,0,null,null)
k.a=C.a.j(n)
k.b=C.a.j(m)
j=Math.sqrt(m*m+t*t)
i=new S.n(null,null)
i.a=C.d.j(m/j)
i.b=C.d.j(t/j)
k.d=i
i=a.e
if(v>=i.length)return H.b(i,v)
k.e=i[v].length
l.push(k)}if(!w){h=x-(r-1)*z
g=Math.sin(h)*b
f=Math.cos(h)*b
w=g-p
t=-(f-o)
l=a.e
if(v>=l.length)return H.b(l,v)
l=l[v]
k=new S.aX(a0,null,0,null,null)
k.a=C.a.j((o+f)*0.5-y)
k.b=C.a.j((p+g)*0.5)
j=Math.sqrt(w*w+t*t)
i=new S.n(null,null)
i.a=C.d.j(w/j)
i.b=C.d.j(t/j)
k.d=i
i=a.e
if(v>=i.length)return H.b(i,v)
k.e=i[v].length
l.push(k)}}},
fh:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=b<=2
y=z?50:30
x=z?1:-1
w=z?0.32142857142857145:0.75
v=w*0.5
if(b===1)u=0.5957446808510638
else u=b===3?0.6666666666666666:1
z=a.Q
t=b-1
if(t<0||t>=20)return H.b(z,t)
z[t]=v*2*u
y=Math.tan(H.P(y/360*2*3.141592653589793))
z=-v
s=z*x*u
r=a.d
if(t>=r.length)return H.b(r,t)
r=r[t]
q=new S.n(null,null)
q.a=C.d.j(s)
q.b=C.d.j(0.5*u)
J.p(r,q)
q=a.d
if(t>=q.length)return H.b(q,t)
q=q[t]
r=new S.n(null,null)
r.a=C.d.j(s)
r.b=C.d.j(-0.5*u)
J.p(q,r)
r=v*x*u
y=0.5-w/y*x
q=a.d
if(t>=q.length)return H.b(q,t)
q=q[t]
s=new S.n(null,null)
s.a=C.d.j(r)
s.b=C.d.j(-y*u)
J.p(q,s)
s=a.d
if(t>=s.length)return H.b(s,t)
t=s[t]
s=new S.n(null,null)
s.a=C.d.j(r)
s.b=C.d.j(y*u)
J.p(t,s)
if(c!=null)a.bD(b,c,v*u,0)
a.al(b,d,z*u,0,-1,0)},
fi:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p
z=b*0.5
y=b*c*0.5
x=y/Math.tan(H.P(d/350*3.141592653589793))
w=a.Q
v=b-1
if(v<0||v>=20)return H.b(w,v)
w[v]=y*2
w=-z
u=-y
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
s=new S.n(null,null)
s.a=C.a.j(w)
s.b=C.a.j(u)
J.p(t,s)
s=a.d
if(v>=s.length)return H.b(s,v)
s=s[v]
t=new S.n(null,null)
t.a=C.a.j(w)
t.b=C.a.j(y)
J.p(s,t)
t=z-x
s=a.d
if(v>=s.length)return H.b(s,v)
s=s[v]
r=new S.n(null,null)
r.a=C.a.j(t)
r.b=C.a.j(y)
J.p(s,r)
r=a.d
if(v>=r.length)return H.b(r,v)
r=r[v]
s=new S.n(null,null)
s.a=C.a.j(z)
s.b=C.c.j(0)
J.p(r,s)
s=a.d
if(v>=s.length)return H.b(s,v)
v=s[v]
s=new S.n(null,null)
s.a=C.a.j(t)
s.b=C.a.j(u)
J.p(v,s)
a.al(b,C.j,w,0,-1,0)
q=e?C.i:C.j
p=e?C.i:C.j
w=-x*0.5
a.al(b,q,w,u,0,-1)
a.al(b,p,w,y,0,1)},
d8:function(a,b){var z,y,x
z="#"+a
y=document.querySelector(z)
z="#"+b
x=document.querySelector(z)
$.$get$d9().i(0,y,x)
S.tt(y)},
ts:function(){var z,y,x
for(z=$.$get$d9(),z=z.gI(z),z=z.gA(z);z.l();){y=z.gp()
x=$.$get$d9().h(0,y)
J.dk(y).ad(0,"tabactive")
J.dk(x).F(0,"hidden")}},
kR:function(a){S.ts()
J.dk(a).F(0,"tabactive")
J.dk($.$get$d9().h(0,a)).ad(0,"hidden")},
tt:function(a){J.a7(a,"click",new S.tu(a),null)},
D:function(a,b,c){var z=H.q(a.ga5().h(0,b),"$isbs")
return z.x===!0&&z.aI()===!0&&z.cx.h(0,c)===!0},
wH:function(a,b,c,d){var z,y,x
z=H.q(a.a.h(0,b),"$isbs")
if(z.x===!0&&z.aI()===!0)for(y=0;y<2;++y){x=c[y]
if(z.cx.h(0,x)===!0)return!0}return!1},
bd:function(a){if(a==null)return!1
return H.af(a,new S.wZ())!=null||H.a1(a,null,new S.x_())!=null},
bw:function(a,b){var z
document.querySelector("#alerttitle").textContent=a
document.querySelector("#alerttext").textContent=H.e(b)
z=document.querySelector("#alertbox").style
z.display="block"
z=document.querySelector("#alertbackground").style
z.display="block"},
di:function(a,b,c,d,e){var z,y
document.querySelector("#confirmtitle").textContent=a
document.querySelector("#confirmtext").textContent=b
z=document.querySelector("#confirmbox").style
z.display="block"
z=document.querySelector("#alertbackground").style
z.display="block"
y=document.querySelector("#confirmbuttonyes")
y.textContent=c
z=new S.wx(e,y)
$.e4=z
J.a7(y,"click",z,null)
document.querySelector("#confirmbuttonno").textContent=d},
ai:function(a,b,c,d){var z,y
for(z=0;z<c;++z)a.a+="\t"
y=a.a+=b
if(d)a.a=y+"\r\n"},
fT:function(a,b){var z,y,x,w
z=J.hh(a,$.$get$lT())
for(y=z.length,x=0,w=0;w<z.length;z.length===y||(0,H.x)(z),++w)x+=P.S(1,C.a.aq(Math.ceil(J.bf(J.al(z[w]),b))))
return x},
wF:[function(a){return C.a.ce(J.bf(J.cF(a),6.283185307179586)*360,1)+"\xb0"},"$1","ro",2,0,37,2],
wM:function(){var z,y,x,w,v,u
z=H.a1(H.q(document.querySelector("#idreorderfield"),"$isiU").value,null,null)
y=H.l(new H.a2(0,null,null,null,null,null,0),[P.E,P.E])
for(x=$.aH.c,w=x.length,v=z,u=0;u<x.length;x.length===w||(0,H.x)(x),++u)v=S.lY(x[u].gW(),v,y)
for(x=$.aH.c,w=x.length,u=0;u<x.length;x.length===w||(0,H.x)(x),++u)S.lX(x[u].gW(),y)
for(x=$.aH.c,w=x.length,u=0;u<x.length;x.length===w||(0,H.x)(x),++u)J.er(x[u])
for(x=$.$get$ba(),w=x.length,u=0;u<x.length;x.length===w||(0,H.x)(x),++u)x[u].jz(y)},
lY:function(a,b,c){var z,y,x
z=a.ga5().h(0,"ident")
y=J.f(z)
if(y.gax(z)===!0){c.i(0,y.gG(z),b)
y.sG(z,b)
b=J.G(b,1)
y=J.r(b)
if(y.S(b,200))b=y.t(b,16800)}x=a.ga5().h(0,"replicateBlock")
y=J.f(x)
return y.gax(x)===!0&&y.gaW(x)===1&&x.gW()!=null?S.lY(x.gW(),b,c):b},
lX:function(a,b){var z,y
z=a.ga5().h(0,"replicateBlock")
y=J.f(z)
if(y.gax(z)===!0)if(y.gaW(z)===1&&z.gW()!=null)S.lX(z.gW(),b)
else if(y.gaW(z)===0)if(b.H(0,z.gbU())){z.sbU(b.h(0,z.gbU()))
if(z.gfe()!=null)J.mu(z.gfe(),H.e(z.gbU()))}},
U:function(a,b){J.a7(a,"click",new S.vl(b),null)},
cC:function(a){var z=J.bA(J.u(a,1000))/10
if(C.d.bM(z,1)===0)return C.d.ce(z,0)
return C.d.v(z)},
hk:{"^":"k;a,b,c,d,e",
eQ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=J.N(a)
if(z.gR(a)===!0)return 1
y=P.a0(this.a,this.b)
b=P.a0(10,b)
for(z=z.gA(a),x=2e9,w=-2e9,v=2e9,u=-2e9;z.l();){t=z.gp()
s=J.f(t)
x=P.a0(x,s.gn(t))
w=P.S(w,s.gn(t))
v=P.a0(v,s.gm(t))
u=P.S(u,s.gm(t))}r=P.S(Math.abs(w-x),Math.abs(u-v))*0.5
q=r>0?P.a0(y*0.75,(0.15*y+b*0.03*y)/r):1
if(c!=null){for(z=c.length,p=0,o=0;o<c.length;c.length===z||(0,H.x)(c),++o){t=c[o]
p=P.S(P.S(r,J.ay(J.eg(t.a))),J.ay(J.eg(t.b)))}n=y*0.5*0.9
z=p*q
if(z>n)q*=n/z}return q},
bW:function(a,b){return this.eQ(a,b,null)},
f3:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(a==null||a.gai()<1)return
z=a.gbw()
y=b-1
if(y>>>0!==y||y>=z.length)return H.b(z,y)
x=z[y]
w=J.dl(x)===!0?50:this.bW(x,b)
z=this.a
y=this.b
v=C.a.aq(Math.floor(z/w*0.5+0.5))*2
y=C.a.aq(Math.floor(y/w*0.5+0.5))
J.bC(this.d,"rgba(255,255,255,0.075)")
for(z=(v-1)*0.5,u=0;u<v;++u){t=C.a.aq(Math.floor(this.a*0.5+(u-z)*w))+0.5
s=this.d
r=J.f(s)
r.Z(s)
r.ab(s,t,0)
r.T(s,t,this.b)
r.a3(s)}for(z=(y*2-1)*0.5,u=0;u<v;++u){q=C.a.aq(Math.floor(this.b*0.5+(u-z)*w))+0.5
y=this.d
s=J.f(y)
s.Z(y)
s.ab(y,0,q)
s.T(y,this.a,q)
s.a3(y)}},
iS:function(a){return this.f3(a,1)},
dC:function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a0==null||a0.gai()<1)return
z=J.Y(a9)
if(z.ak(a9,a0.gai()))a0=$.$get$aF()
y=a0.gbw()
x=z.ac(a9,1)
if(x>>>0!==x||x>=y.length)return H.b(y,x)
w=y[x]
x=a0.gdD()
y=z.ac(a9,1)
if(y>>>0!==y||y>=x.length)return H.b(x,y)
v=x[y]
if(a4==null)a4=a3
if(a7==null)a7=a3
y=J.N(w)
if(J.fW(y.gk(w),2))return
u=P.a0(this.a,this.b)
z=J.u(z.Y(a9,0.03),u)
if(typeof z!=="number")return H.C(z)
t=0.15*u+z
if(b0===0)b0=this.bW(w,a9)
if(a8){for(z=y.gA(w),s=2e9,r=-2e9,q=2e9,p=-2e9;z.l();){o=z.gp()
x=J.f(o)
s=P.a0(s,x.gn(o))
r=P.S(r,x.gn(o))
q=P.a0(q,x.gm(o))
p=P.S(p,x.gm(o))}b1=J.T(b1,(s+r)*0.5)
b2=J.T(b2,(q+p)*0.5)}z=this.d
if(a3!==a4){x=this.a*0.5
n=this.b*0.5
m=J.ma(z,x-t,n-t,x+t,n+t)
m.addColorStop(0,a3)
m.addColorStop(1,a4)
J.bB(this.d,m)}else J.bB(z,a3)
J.bC(this.d,a7)
z=this.a
x=J.u(b1,b0)
if(typeof x!=="number")return H.C(x)
l=z*0.5+x
x=this.b
z=J.u(b2,b0)
if(typeof z!=="number")return H.C(z)
k=x*0.5+z
j=Math.sin(H.P(a1))
i=Math.cos(H.P(a1))
if(!a6){J.eh(this.d)
for(z=y.gA(w),h=!0;z.l();){o=z.gp()
y=J.f(o)
g=J.T(J.u(y.gn(o),i),J.u(y.gm(o),j))
f=J.G(J.u(y.gn(o),j),J.u(y.gm(o),i))
y=J.a_(f)
x=this.d
n=J.a_(g)
if(h){J.hf(x,J.G(n.Y(g,b0),l),J.G(y.Y(f,b0),k))
h=!1}else J.hd(x,J.G(n.Y(g,b0),l),J.G(y.Y(f,b0),k))}z=this.d
y=J.f(z)
y.a8(z)
y.az(z)
y.a3(z)}if(this.e)for(z=v.length,y=J.r(a5),e=0;e<v.length;v.length===z||(0,H.x)(v),++e){d=v[e]
x=J.f(d)
c=J.T(J.u(x.gn(d),i),J.u(x.gm(d),j))
b=J.G(J.u(x.gn(d),j),J.u(x.gm(d),i))
g=J.ei(J.G(J.u(c,b0),l))+0.5
f=J.ei(J.G(J.u(b,b0),k))+0.5
a=x.gD(d)
a.gfb()
x=this.d
n=J.f(x)
n.Z(x)
n.scT(x,a2?a.geV():a.gil())
n.fU(x,g-2,f-2,4,4)
if(y.S(a5,a)){x=this.d
n=J.f(x)
n.ab(x,g-3.5,f)
n.T(x,g-7.5,f)
n.ab(x,g+3.5,f)
n.T(x,g+7.5,f)
n.ab(x,g,f-3.5)
n.T(x,g,f-7.5)
n.ab(x,g,f+3.5)
n.T(x,g,f+7.5)}J.ep(this.d)}},
iM:function(a,b,c,d,e,f,g,h,i,j){return this.dC(a,b,!1,c,d,null,e,f,!1,g,h,i,j)},
iN:function(a,b){return this.dC(a,0,b,"#808080",null,null,!1,null,!1,1,0,0,0)},
iO:function(a,b,c,d,e,f,g,h){return this.dC(a,0,b,c,d,e,!1,f,g,h,0,0,0)},
iJ:function(f1,f2,f3,f4,f5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0
H.q(f1.ga5().h(0,"name"),"$isb6").ch
z=H.q(f1.ga5().h(0,"shape"),"$isdJ")
y=H.q(f1.ga5().h(0,"scale"),"$isaj")
x=H.q(f1.ga5().h(0,"fillColor"),"$isan")
w=H.q(f1.ga5().h(0,"fillColor1"),"$isan")
v=H.q(f1.ga5().h(0,"lineColor"),"$isan")
u=H.q(f1.ga5().h(0,"features"),"$isbs")
t=H.q(f1.ga5().h(0,"shield"),"$iscW")
s=H.q(t.ch.a.h(0,"color"),"$isan")
r=H.q(t.ch.a.h(0,"lineColor"),"$isan")
q=$.$get$c5()
p=y.x===!0?y.ch:1
if(z.x===!0)q=z.ch
o=J.Y(p)
if(o.ak(p,q.gai()))q=$.$get$aF()
n="module: "+H.e(J.am(q))+" @ "+H.e(p)
H.fR(n)
m=x.x===!0?x.ct():"#000000"
if(w.x===!0)l=w.ct()
else l=x.x===!0?m:"#800080"
k=v.x===!0?v.ct():"#FFFFFF"
j=s.x===!0?s.ct():"#FFFFFF"
i=s.x===!0?"rgba("+s.ch+","+s.cx+","+s.cy+",0.0)":"rgba(255,255,255,0)"
if(r.x===!0)h=r.cu(!0)
else h=s.x===!0?s.cu(!0):"#FFFFFF"
g=q.gbw()
f=o.ac(p,1)
if(f>>>0!==f||f>=g.length)return H.b(g,f)
e=g[f]
if(f3===0)f3=this.bW(e,p)
d=u.x===!0&&u.cx.h(0,$.$get$eE())===!0
this.iM(q,f2,m,l,d,k,p,f3,f4,f5)
c=J.ha(f1)!=null&&u.x===!0&&u.cx.h(0,$.$get$cQ())===!0
b=u.x===!0&&u.cx.h(0,$.$get$cU())===!0
a=u.x===!0&&u.cx.h(0,$.$get$cS())===!0
a0=u.x===!0&&u.cx.h(0,$.$get$aV())===!0
a1=u.x===!0&&u.cx.h(0,$.$get$dy())===!0
a2=u.x===!0&&u.cx.h(0,$.$get$ck())===!0
a3=u.x===!0&&u.cx.h(0,$.$get$cm())===!0
a4=u.x===!0&&u.cx.h(0,$.$get$cl())===!0
a5=u.x===!0&&u.cx.h(0,$.$get$ci())===!0
a6=u.x===!0&&u.cx.h(0,$.$get$cT())===!0
if(c){b=!1
a0=!1
a1=!1
a2=!1}if(a1)b=!1
if(d){c=!1
b=!1
a=!1
a0=!1
a1=!1
a2=!1}if(a0)a2=!1
g=typeof f2!=="number"
if(g)H.F(H.I(f2))
Math.sin(f2)
if(g)H.F(H.I(f2))
Math.cos(f2)
f=q.gjq()
a7=o.ac(p,1)
if(a7>>>0!==a7||a7>=20)return H.b(f,a7)
a8=f[a7]
a9=new S.dU(null,null)
if(g)H.F(H.I(f2))
f=Math.sin(f2)
a9.a=f
if(g)H.F(H.I(f2))
g=Math.cos(f2)
a9.b=g
a7=q.gh6()
b0=o.ac(p,1)
if(b0>>>0!==b0||b0>=20)return H.b(a7,b0)
b0=a7[b0]
if(typeof b0!=="number")return b0.Y()
b1=b0*f3*0.5
b0=a8.a
a7=a8.b
b2=J.G(J.u(J.G(f4,J.T(J.u(b0,g),J.u(a7,f))),f3),this.a*0.5)
a7=a8.a
b0=a8.b
b3=J.G(J.u(J.G(f5,J.G(J.u(a7,f),J.u(b0,g))),f3),this.a*0.5)
J.bC(this.d,k)
b4=J.md(this.d)
if(c){b5="rgba("+x.ch+","+x.cx+","+x.cy+",0.25)"
b6="rgba("+w.ch+","+w.cx+","+w.cy+",0.25)"
b7=1/Math.sqrt(2)
b8=Math.sqrt(2)*0.5
for(g=J.a_(b2),f=J.a_(b3),b9=b1,c0=0;c0<3;++c0){a7=this.d
b0=J.f(a7)
b0.saU(a7,b5)
b0.scg(a7,"lighter")
b0.Z(a7)
c1=-b9
c2=c1*b8
b0.ab(a7,g.t(b2,c2*a9.b-c2*a9.a),f.t(b3,c2*a9.a+c2*a9.b))
c3=b9*b8
b0.T(a7,g.t(b2,c2*a9.b-c3*a9.a),f.t(b3,c2*a9.a+c3*a9.b))
b0.T(a7,g.t(b2,c3*a9.b-c3*a9.a),f.t(b3,c3*a9.a+c3*a9.b))
b0.T(a7,g.t(b2,c3*a9.b-c2*a9.a),f.t(b3,c3*a9.a+c2*a9.b))
b0.a8(a7)
b0.az(a7)
b0.saU(a7,b6)
b0.scg(a7,"source-over")
b0.Z(a7)
b0.ab(a7,g.t(b2,0*a9.b-c1*a9.a),f.t(b3,0*a9.a+c1*a9.b))
b0.T(a7,g.t(b2,b9*a9.b-0*a9.a),f.t(b3,b9*a9.a+0*a9.b))
b0.T(a7,g.t(b2,0*a9.b-b9*a9.a),f.t(b3,0*a9.a+b9*a9.b))
b0.T(a7,g.t(b2,c1*a9.b-0*a9.a),f.t(b3,c1*a9.a+0*a9.b))
b0.a8(a7)
b0.az(a7)
b9*=b7}}if(b){g=this.d
f=J.f(g)
f.Z(g)
f.aB(g,b2,b3,b1*0.66,0,6.283185307179586)
f.a8(g)
f.a3(g)
f.Z(g)
f.aB(g,b2,b3,b1*0.33,0,6.283185307179586)
f.a8(g)
f.a3(g)
f.Z(g)
f.aB(g,b2,b3,b1*0.2,0,6.283185307179586)
f.a8(g)
f.a3(g)}if(a0){g=this.d
f=J.f(g)
f.Z(g)
a7=-b1
b0=a7*0.75
a7=a7*2/3
c1=J.a_(b2)
c2=J.a_(b3)
f.ab(g,c1.t(b2,b0*a9.b-a7*a9.a),c2.t(b3,b0*a9.a+a7*a9.b))
a7=b1*2/3
f.T(g,c1.t(b2,b0*a9.b-a7*a9.a),c2.t(b3,b0*a9.a+a7*a9.b))
a7=b1*0.75
f.T(g,c1.t(b2,a7*a9.b-0*a9.a),c2.t(b3,a7*a9.a+0*a9.b))
f.a8(g)
f.a3(g)}if(a1){b9=0.9*b1
b8=Math.sqrt(2)*0.5
g=this.d
f=J.f(g)
f.Z(g)
a7=-b9
b0=J.a_(b2)
c1=J.a_(b3)
f.ab(g,b0.t(b2,0*a9.b-a7*a9.a),c1.t(b3,0*a9.a+a7*a9.b))
f.T(g,b0.t(b2,b9*a9.b-0*a9.a),c1.t(b3,b9*a9.a+0*a9.b))
f.T(g,b0.t(b2,0*a9.b-b9*a9.a),c1.t(b3,0*a9.a+b9*a9.b))
f.T(g,b0.t(b2,a7*a9.b-0*a9.a),c1.t(b3,a7*a9.a+0*a9.b))
f.a8(g)
f.a3(g)
f.Z(g)
a7*=b8
f.ab(g,b0.t(b2,a7*a9.b-a7*a9.a),c1.t(b3,a7*a9.a+a7*a9.b))
c2=b9*b8
f.T(g,b0.t(b2,a7*a9.b-c2*a9.a),c1.t(b3,a7*a9.a+c2*a9.b))
f.T(g,b0.t(b2,c2*a9.b-c2*a9.a),c1.t(b3,c2*a9.a+c2*a9.b))
f.T(g,b0.t(b2,c2*a9.b-a7*a9.a),c1.t(b3,c2*a9.a+a7*a9.b))
f.a8(g)
f.a3(g)}if(a2){g=this.d
f=J.f(g)
f.Z(g)
if(typeof f2!=="number")return H.C(f2)
f.aB(g,b2,b3,b1*0.5,0.5235987755982988+f2,5.759586531581287+f2)
f.a3(g)
f.Z(g)
f.ab(g,b2,b3)
a7=b1*0.6
f.T(g,J.G(b2,a7*a9.b-0*a9.a),J.G(b3,a7*a9.a+0*a9.b))
f.a8(g)
f.a3(g)}if(a){J.bB(this.d,l)
g=J.a_(f2)
f=g.t(f2,2.0943951023931953)
a7=typeof f!=="number"
if(a7)H.F(H.I(f))
b0=Math.sin(f)
if(a7)H.F(H.I(f))
f=Math.cos(f)
g=g.ac(f2,2.0943951023931953)
a7=typeof g!=="number"
if(a7)H.F(H.I(g))
c1=Math.sin(g)
if(a7)H.F(H.I(g))
g=Math.cos(g)
c4=b1*0.8
c5=b1*0.3
a7=this.d
c2=J.f(a7)
c2.Z(a7)
c2.ab(a7,b2,b3)
c3=-c5
c6=J.a_(b2)
c7=J.a_(b3)
c2.T(a7,c6.t(b2,c3*a9.b-c4*a9.a),c7.t(b3,c3*a9.a+c4*a9.b))
c2.T(a7,c6.t(b2,c5*a9.b-c4*a9.a),c7.t(b3,c5*a9.a+c4*a9.b))
c2.a8(a7)
c2.az(a7)
c2.a3(a7)
a7=this.d
c2=J.f(a7)
c2.Z(a7)
c2.ab(a7,b2,b3)
c2.T(a7,c6.t(b2,c3*f-c4*b0),c7.t(b3,c3*b0+c4*f))
c2.T(a7,c6.t(b2,c5*f-c4*b0),c7.t(b3,c5*b0+c4*f))
c2.a8(a7)
c2.az(a7)
c2.a3(a7)
a7=this.d
c2=J.f(a7)
c2.Z(a7)
c2.ab(a7,b2,b3)
c2.T(a7,c6.t(b2,c3*g-c4*c1),c7.t(b3,c3*c1+c4*g))
c2.T(a7,c6.t(b2,c5*g-c4*c1),c7.t(b3,c5*c1+c4*g))
c2.a8(a7)
c2.az(a7)
c2.a3(a7)}if(a3&&a4&&!a5){c8=H.q(f1.ga5().h(0,"laser"),"$iscW")
c9=H.q(c8.ch.a.h(0,"damage"),"$isv")
d0=H.q(c8.ch.a.h(0,"range"),"$isv")
J.c0(c8.ch.a.h(0,"explosive"))
d1=H.q(c8.ch.a.h(0,"explodeRadius"),"$isv")
d2=c9.x===!0?c9.ch:1
d3=d0.x===!0?d0.ch:100
if(d1.x===!0)d1.ch
g=J.a_(d2)
d4=J.u(J.u(g.Y(d2,0.01),0.24242424242424243),f3)
d5=Math.abs(P.a0(d4,b1)*0.5)
d6=Math.abs(P.a0(J.u(d4,0.5),b1))
if(typeof p!=="number")return H.C(p)
d7=P.S(P.S(f3*p*0.25,0.7777777777777778*b1),J.u(J.u(J.u(d3,0.001),0.6),f3))
f=this.d
a7=J.f(f)
a7.saU(f,b4)
a7.Z(f)
a7.aB(f,b2,b3,d5*2,0,6.283185307179586)
a7.a8(f)
a7.az(f)
a7.a3(f)
if(g.aN(d2,0))J.bB(this.d,l)
g=this.d
f=J.f(g)
f.Z(g)
a7=-d5
b0=-d6
c1=J.a_(b2)
c2=J.a_(b3)
f.ab(g,c1.t(b2,a7*a9.b-b0*a9.a),c2.t(b3,a7*a9.a+b0*a9.b))
f.T(g,c1.t(b2,a7*a9.b-d6*a9.a),c2.t(b3,a7*a9.a+d6*a9.b))
a7=d7*2-d5
f.T(g,c1.t(b2,a7*a9.b-0*a9.a),c2.t(b3,a7*a9.a+0*a9.b))
f.a8(g)
f.az(g)
f.a3(g)}if(a3&&a5&&!a4){d8=H.q(f1.ga5().h(0,"cannon"),"$iscW")
c9=H.q(d8.ch.a.h(0,"damage"),"$isv")
d9=H.q(d8.ch.a.h(0,"roundsPerSec"),"$isv")
e0=H.q(d8.ch.a.h(0,"muzzleVel"),"$isv")
e1=J.c0(d8.ch.a.h(0,"explosive"))
d1=H.q(d8.ch.a.h(0,"explodeRadius"),"$isv")
d2=c9.x===!0?c9.ch:1
e2=d9.x===!0?d9.ch:1
e3=e0.x===!0?e0.ch:100
e4=d1.x===!0?d1.ch:10
if(typeof d2!=="number")H.F(H.I(d2))
d4=P.S(0,Math.sqrt(d2)/8*f3*0.5)
g=e1===!0
if(g){if(typeof e4!=="number")H.F(H.I(e4))
d4*=P.S(1.4,0.31*Math.sqrt(e4))}f=0.25*f3
a7=0.9*b1
b0=P.a0(P.S(f,d4),a7)
f=P.S(f,d4)
d6=P.a0(f,0.9*Math.sqrt(2)*b1)*0.5
e5=P.S(1,1+C.a.aq(Math.floor(J.bf(J.T(e2,2),4))))
e6=P.S(1,P.a0(C.a.aq(Math.floor(0.675*b1*2/(d6*2.2))),e5))
d5=P.S(b0*0.5,P.a0(a7*0.5,d6*(e6*2-1)*0.5))
if(e6>1){f=e6*d6
e7=P.S(P.a0(d6*2,d6*0.25+f*0.05),(d5*0.8*2-f)/(e6-1))}else e7=0
f=d5*2
g=g?0.9:1
d7=P.S(f*g,J.u(J.u(o.Y(p,f3),0.5),J.bf(e3,1128.3)))
o=this.d
g=J.f(o)
g.saU(o,b4)
g.Z(o)
g.aB(o,b2,b3,f,0,6.283185307179586)
g.a8(o)
g.az(o)
g.a3(o)
e8=(e6*d6*2+(e6-1)*e7)*0.5-d6
for(o=d6*2+e7,g=-d5,f=-d6-e8,a7=J.a_(b2),b0=J.a_(b3),c1=d6-e8,c2=d7*2-d5,c0=0;c0<e6;++c0){b8=c0*o
c3=this.d
c6=J.f(c3)
c6.Z(c3)
c7=f+b8
c6.ab(c3,a7.t(b2,g*a9.b-c7*a9.a),b0.t(b3,g*a9.a+c7*a9.b))
e9=c1+b8
c6.T(c3,a7.t(b2,g*a9.b-e9*a9.a),b0.t(b3,g*a9.a+e9*a9.b))
c6.T(c3,a7.t(b2,c2*a9.b-e9*a9.a),b0.t(b3,c2*a9.a+e9*a9.b))
c6.T(c3,a7.t(b2,c2*a9.b-c7*a9.a),b0.t(b3,c2*a9.a+c7*a9.b))
c6.a8(c3)
c6.az(c3)
c6.a3(c3)}}if(a6){f0=J.mb(this.d,b2,b3,0,b2,b3,b1)
f0.addColorStop(0,i)
f0.addColorStop(1,j)
o=this.d
g=J.f(o)
g.saU(o,f0)
g.scT(o,h)
g.scg(o,"lighter")
g.Z(o)
g.aB(o,b2,b3,b1,0,6.283185307179586)
g.a8(o)
g.az(o)
g.a3(o)
g.scg(o,"source-over")}},
dB:function(b6,b7,b8,b9,c0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5
z=H.l([],[S.n])
y=new S.dU(null,null)
y.a=Math.sin(H.P(b7))
y.b=Math.cos(H.P(b7))
for(x=b6.length,w=b7!==0,v=0,u=0,t=0,s=0,r=2e9,q=-2e9,p=2e9,o=-2e9,n=0;n<b6.length;b6.length===x||(0,H.x)(b6),++n){m=b6[n]
l=m.gW()
k=H.q(l.ga5().h(0,"shape"),"$isdJ")
j=H.q(l.ga5().h(0,"scale"),"$isaj")
i=H.q(l.ga5().h(0,"density"),"$isv")
h=j.x===!0?j.ch:1
g=$.$get$c5()
if(k.x===!0)g=k.as(0)
f=J.Y(h)
if(f.ak(h,g.gai()))g=$.$get$aF()
e=i.x===!0?i.ch:0.1
d=J.f(m)
c=d.gbr(m)
b=new S.dU(null,null)
a=typeof c!=="number"
if(a)H.F(H.I(c))
b.a=Math.sin(c)
if(a)H.F(H.I(c))
b.b=Math.cos(c)
c=J.cE(g)
a=f.ac(h,1)
if(a>>>0!==a||a>=c.length)return H.b(c,a)
a0=P.S(0.01,J.u(e,c[a]))
a=g.gij()
c=f.ac(h,1)
if(c>>>0!==c||c>=20)return H.b(a,c)
a1=a[c]
s+=a0
c=J.u(J.G(a1.a,d.gn(m)),a0)
if(typeof c!=="number")return H.C(c)
u+=c
c=J.u(J.G(a1.b,d.gm(m)),a0)
if(typeof c!=="number")return H.C(c)
t+=c
v=P.S(h,v)
c=g.gbw()
f=f.ac(h,1)
if(f>>>0!==f||f>=c.length)return H.b(c,f)
f=J.a5(c[f])
for(;f.l();){a2=f.gp()
c=J.f(a2)
a3=J.ay(c.gn(a2))
a4=J.ay(c.gm(a2))
c=b.b
a=b.a
a5=d.gn(m)
if(typeof a5!=="number")return H.C(a5)
a6=a3*c-a4*a+a5
a5=b.a
a=b.b
c=d.gm(m)
if(typeof c!=="number")return H.C(c)
a7=a3*a5+a4*a+c
if(w){c=y.b
a=y.a
a8=a6*c-a7*a
a9=a6*a+a7*c
a7=a9
a6=a8}c=new S.n(null,null)
c.a=C.a.j(a6)
c.b=C.a.j(a7)
z.push(c)
r=P.a0(r,a6)
q=P.S(q,a6)
p=P.a0(p,a7)
o=P.S(o,a7)}}b0=u/s
b1=t/s
if(b9){b0+=(r+q)*0.5
b1+=(p+o)*0.5}for(x=z.length,n=0;n<z.length;z.length===x||(0,H.x)(z),++n){a2=z[n]
a2.a=J.T(a2.a,b0)
a2.b=J.T(a2.b,b1)}if(b8!=null){l=b8.a
x=J.f(l)
g=x.E(l,"shape")
h=x.E(l,"scale")
x=J.Y(h)
f=(x.ak(h,g.gai())?$.$get$aF():g).gbw()
x=x.ac(h,1)
if(x>>>0!==x||x>=f.length)return H.b(f,x)
b2=this.eQ(f[x],h,z)}else b2=this.bW(z,c0!=null?c0:v)
for(x=b6.length,a8=null,a9=null,n=0;n<b6.length;b6.length===x||(0,H.x)(b6),++n){m=b6[n]
f=J.f(m)
b3=J.T(f.gn(m),b0)
b4=J.T(f.gm(m),b1)
b5=f.gbr(m)
if(w){f=J.a_(b3)
d=J.a_(b4)
a8=J.T(f.Y(b3,y.b),d.Y(b4,y.a))
a9=J.G(f.Y(b3,y.a),d.Y(b4,y.b))
b5=J.G(b5,b7)
b4=a9
b3=a8}this.iJ(m.gW(),b5,b2,b3,b4)}},
iL:function(a,b,c,d){return this.dB(a,b,null,c,d)},
f2:function(a){return this.dB(a,0,null,!1,null)},
iK:function(a,b){return this.dB(a,0,b,!1,null)},
e1:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=[]
z.push(new S.cf(a4.gW(),0,0,0))
y=J.a8(a4.gW(),"shape")
x=J.a8(a4.gW(),"scale")
w=J.Y(x)
if(w.ak(x,y.gai()))y=$.$get$aF()
v=y.gfa()
u=w.ac(x,1)
if(u>>>0!==u||u>=20)return H.b(v,u)
if(!v[u].H(0,C.i))return z
t=H.q(a4.gW().ga5().h(0,"features"),"$isbs")
if(t.x===!0&&t.cx.h(0,$.$get$aV())===!0){s=J.a8(a4.gW(),"replicateBlock")
if(s!=null){v=J.f(s)
r=v.E(s,"shape")
q=v.E(s,"scale")
p=[C.j,C.o,C.b]
o=[]
v=y.gdD()
w=w.ac(x,1)
if(w>>>0!==w||w>=v.length)return H.b(v,w)
w=v[w]
v=w.length
n=0
for(;n<w.length;w.length===v||(0,H.x)(w),++n){m=w[n]
if(J.dm(m)===C.i)if(y.gdQ())o.push(m)
else{if(J.bq(m.gaw().a,-0.7072))continue
o.push(m)}}if(o.length===0)return z
l=[]
w=r.gdD()
v=J.T(q,1)
if(v>>>0!==v||v>=w.length)return H.b(w,v)
v=w[v]
w=v.length
n=0
for(;n<v.length;v.length===w||(0,H.x)(v),++n){m=v[n]
if(C.e.M(p,J.dm(m)))l.push(m)}if(l.length===0)return z
for(w=o.length,n=0;n<o.length;o.length===w||(0,H.x)(o),++n){m=o[n]
v=m.gaw().b
u=m.gaw().a
if(typeof v!=="number")H.F(H.I(v))
if(typeof u!=="number")H.F(H.I(u))
k=Math.atan2(v,u)
j=P.as()
i=[]
h=y.gdQ()?m.gaw().a:1
g=y.gdQ()?J.fX(m.gaw().b):0
for(v=l.length,u=J.a_(h),f=J.a_(g),e=k+3.141592653589793,d=0;d<l.length;l.length===v||(0,H.x)(l),++d){c=l[d]
b=c.gaw().b
a=c.gaw().a
if(typeof b!=="number")H.F(H.I(b))
if(typeof a!=="number")H.F(H.I(a))
b=e-Math.atan2(b,a)
a=Math.sin(b)
a0=J.T(u.Y(h,Math.cos(b)),f.Y(g,a))
if(J.bq(a0,-0.001))continue
j.i(0,c,a0)
i.push(c)}v=i.length
if(v===0)continue
u=new S.my(j);--v
if(v-0<=32)H.kO(i,0,v,u)
else H.kN(i,0,v,u)
if(0>=i.length)return H.b(i,0)
c=i[0]
v=c.gaw().b
u=c.gaw().a
if(typeof v!=="number")H.F(H.I(v))
if(typeof u!=="number")H.F(H.I(u))
v=e-Math.atan2(v,u)
u=Math.sin(v)
f=Math.cos(v)
e=J.f(m)
b=e.gn(m)
a=J.f(c)
a1=a.gn(c)
a2=a.gm(c)
a3=J.T(b,J.T(J.u(a1,f),J.u(a2,u)))
e=e.gm(m)
a2=a.gn(c)
a=a.gm(c)
z.push(new S.cf(s,a3,J.T(e,J.G(J.u(a2,u),J.u(a,f))),v))}}}return z},
iP:function(a){var z,y,x,w,v,u,t,s
if(a.a==null)return
z=this.e1(a)
y=a.a
x=y.E(0,"shape")
w=a.a.E(0,"scale")
v=J.Y(w)
if(v.ak(w,x.gai()))x=$.$get$aF()
u=J.f(x)
P.cD("comp: "+H.e(u.gB(x))+" @ "+H.e(w))
t=x.gbw()
v=v.ac(w,1)
if(v>>>0!==v||v>=t.length)return H.b(t,v)
this.bW(t[v],w)
s=H.q(a.a.a.h(0,"features"),"$isbs")
if(s.x===!0&&s.cx.h(0,$.$get$aV())===!0)this.iK(z,new S.cf(y,0,0,0))
else this.f2(z)
if(u.S(x,$.$get$aF())){y=this.d
v=J.f(y)
v.saU(y,"rgba(60,60,60,0.6)")
v.iV(y,0,0,this.a,this.b)
v.saU(y,"#DDDDDD")
v.scC(y,""+C.a.aq(Math.floor(this.b/2))+"px Droid Sans Mono")
v.sdV(y,"center")
v.bG(y,"?",this.a/2,this.b/4*2.4)
v.scC(y,""+C.a.aq(Math.floor(this.b/9))+"px Droid Sans Mono")
v.bG(y,"Missing shape",this.a/2,this.b/4*3.2)}},
iR:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=[]
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.x)(a),++x){w=a[x]
v=this.e1(w.a)
for(u=v.length,t=0;t<v.length;v.length===u||(0,H.x)(v),++t){s=v[t]
s.b6(0,w.d)
s.jp(0,w.b,w.c)
z.push(s)}}this.iL(z,b,!0,d)},
iQ:function(a,b,c){return this.iR(a,b,!0,c)},
h8:function(a,b){var z,y
z=W.ev(null,null)
y=J.f(z)
y.sar(z,this.a)
y.sap(z,this.b)
this.c=z
this.d=J.em(z,"2d")},
C:{
cJ:function(a,b){var z=new S.hk(a,b,null,null,!0)
z.h8(a,b)
return z}}},
my:{"^":"a:21;a",
$2:function(a,b){var z,y,x
z=J.f(a)
y=J.f(b)
if(z.gD(a).gcI()!==y.gD(b).gcI())return C.c.aS(y.gD(b).gcI(),z.gD(a).gcI())
x=this.a
if(J.bq(J.eg(J.T(x.h(0,b),x.h(0,a))),0.001))return J.bZ(y.ga6(b),z.ga6(a))
return J.bZ(x.h(0,b),x.h(0,a))}},
cf:{"^":"k;W:a<,n:b*,m:c*,br:d>",
b6:function(a,b){var z,y,x,w
z=this.d
if(typeof b!=="number")return H.C(b)
this.d=z+b
y=Math.sin(H.P(b))
x=Math.cos(H.P(b))
z=this.b
if(typeof z!=="number")return H.C(z)
w=this.c
if(typeof w!=="number")return H.C(w)
this.b=x*z-y*w
this.c=y*z+x*w},
jp:function(a,b,c){this.b=J.G(this.b,b)
this.c=J.G(this.c,c)}},
mJ:{"^":"k;a,n:b*,m:c*,br:d>"},
hr:{"^":"k;W:a<,aT:b<,cH:c?,d,e,f,r,c8:x@,y",
J:function(){var z,y
z=S.ex(null)
y=this.a.J()
z.a=y
y.r=z
H.q(y.a.h(0,"ident"),"$isdI").ch=S.hs()
return z},
cj:function(a){var z,y
this.r=!0
z=this.a.ay(0)
y=this.a
y.K(y.x)
this.c.f.appendChild(z)
this.b.className="ui component selected"},
cz:function(){this.r=!1
this.a.aD()
this.b.className="ui component"},
ay:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=document
y=z.createElement("div")
y.className="ui component"
J.a7(y,"click",new S.mK(this),null)
this.b=y
y.appendChild(this.y.c)
z=document
x=z.createElement("span")
this.d=x
x.textContent="Block name"
x.className="componentname"
y.appendChild(x)
z=document
w=z.createElement("span")
this.e=w
w.textContent="Block info"
w.className="componentinfo"
y.appendChild(w)
z=document
v=z.createElement("div")
v.className="ui sortbutton sortleft"
z=J.f(v)
z.sa9(v,'<i class="glyphicon glyphicon-menu-left"></i>')
v.title="Move this block left"
z.L(v,"click",new S.mL(this),null)
y.appendChild(v)
z=document
u=z.createElement("div")
u.className="ui sortbutton sortright"
z=J.f(u)
z.sa9(u,'<i class="glyphicon glyphicon-menu-right"></i>')
u.title="Move this block right"
z.L(u,"click",new S.mM(this),null)
y.appendChild(u)
z=document
t=z.createElement("div")
t.className="ui copybutton"
z=J.f(t)
z.sa9(t,'<i class="glyphicon glyphicon-duplicate"></i>')
t.title="Duplicate this block."
z.L(t,"click",new S.mN(this),null)
y.appendChild(t)
z=document
s=z.createElement("div")
s.className="ui deletebutton"
z=J.f(s)
z.sa9(s,'<i class="glyphicon glyphicon-trash"></i>')
s.title="Delete this block"
z.L(s,"click",new S.mO(this),null)
y.appendChild(s)
z=document
r=z.createElement("div")
r.className="deletescreen"
z=J.f(r)
z.sa9(r,"Delete this block?<br/>")
z.L(r,"click",new S.mP(),null)
this.f=r
y.appendChild(r)
z=document
q=z.createElement("div")
q.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
q.title="Delete the block"
J.a7(q,"click",new S.mQ(this),null)
r.appendChild(q)
z=document
p=z.createElement("div")
p.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
p.title="Keep the block"
J.a7(p,"click",new S.mR(this),null)
r.appendChild(p)
z=this.a
z.K(z.x)},
aK:function(){this.a.aD()
J.aL(this.b)
this.b=null},
fB:function(a){var z,y,x,w,v,u,t,s,r,q
z=H.q(this.a.a.h(0,"name"),"$isb6")
y=this.a
H.e(y.ch?y.z:"?")
y=this.d
J.aq(y,z.x===!0?J.dn(z.ch,"\\n","<br/>"):"")
x="<span title='Faction # Block ID'>"+H.e(H.q(this.a.a.h(0,"group"),"$isaj").ch)+"#"+H.e(H.q(this.a.a.h(0,"ident"),"$isaj").ch)+"</span> <span title='Block Scale' class='blockscale glyphicon glyphicon-stop'>"+H.e(H.q(this.a.a.h(0,"scale"),"$isaj").ch)+"</span>"
w=H.q(this.a.a.h(0,"features"),"$isbs")
if(w.x===!0)for(y=w.cx,v=y.gI(y),v=v.gA(v),u=!1;v.l();){t=v.gp()
if(y.h(0,t)===!0){if(t.gcD()==null)continue
if(!u){x+="<br/>"
u=!0}x+="<span class='glyphicon glyphicon-"+H.e(t.gcD())+"' title='"+t.gfd()+"'></span>"}}y=$.$get$ba()
v=y.length
r=0
while(!0){if(!(r<y.length)){s=!1
break}if(y[r].r.M(0,this.a.E(0,"ident"))){s=!0
break}y.length===v||(0,H.x)(y);++r}if($.$get$ba().length>0&&!s)x+="<br/><span class='glyphicon glyphicon-question-sign' title='This block is not used in any loaded ship design'></span>"
J.aq(this.e,x)
q=H.q(this.a.a.h(0,"blurb"),"$isb6")
y=this.b
y.title=q.x===!0?q.ch:""
if(a){y=this.y
J.aS(y.d,0,0,y.a,y.b)
y.iP(this)}},
dX:function(){return this.fB(!0)},
a1:function(a){var z=this.a
z.K(z.x)},
aY:function(a,b,c){this.a.aY(0,b,c)},
ha:function(a){var z
this.y=S.cJ(100,100)
z=this.a
if(z==null){z=S.bL(!1)
this.a=z}z.r=this},
C:{
ex:function(a){var z=new S.hr(a,null,null,null,null,null,!1,null,null)
z.ha(a)
return z},
hs:function(){var z,y,x,w,v
z=P.ab(null,null,null,P.E)
for(y=$.aH.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w)z.F(0,J.a8(y[w].gW(),"ident"))
for(v=1;!0;)if(z.M(0,v))++v
else break
return v}}},
mK:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.ck(0,y)
z.b_(a)
z.a2(a)
z.c9(a)},null,null,2,0,null,0,"call"]},
mL:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.cl(z)},null,null,2,0,null,0,"call"]},
mM:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.cm(z)},null,null,2,0,null,0,"call"]},
mN:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.cv(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
mO:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a.f.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
mP:{"^":"a:0;",
$1:[function(a){var z=J.f(a)
z.a2(a)
z.b_(a)},null,null,2,0,null,0,"call"]},
mQ:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.c.bZ(z)},null,null,2,0,null,0,"call"]},
mR:{"^":"a:0;a",
$1:[function(a){var z=this.a.f.style
z.display="none"},null,null,2,0,null,0,"call"]},
b5:{"^":"b4;a6:ch>,fj:cx<,cy,db,j6:dx<,aT:dy<,fr,fx,fy,go,id,cH:k1?,c8:k2@,a,b,c,d,e,f,r,x,y,z,Q",
ay:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=document
y=z.createElement("div")
y.className="ui component"
J.a7(y,"click",new S.n0(this),null)
this.dy=y
y.appendChild(this.id.c)
z=document
x=z.createElement("span")
this.fr=x
x.textContent="Shape name"
x.className="componentname"
y.appendChild(x)
z=document
w=z.createElement("span")
this.fx=w
w.textContent="Shape info"
w.className="componentinfo"
y.appendChild(w)
z=document
v=z.createElement("div")
v.className="ui sortbutton sortleft"
z=J.f(v)
z.sa9(v,'<i class="glyphicon glyphicon-menu-left"></i>')
v.title="Move this shape left"
z.L(v,"click",new S.n1(this),null)
y.appendChild(v)
z=document
u=z.createElement("div")
u.className="ui sortbutton sortright"
z=J.f(u)
z.sa9(u,'<i class="glyphicon glyphicon-menu-right"></i>')
u.title="Move this shape right"
z.L(u,"click",new S.n2(this),null)
y.appendChild(u)
z=document
t=z.createElement("div")
t.className="ui copybutton"
z=J.f(t)
z.sa9(t,'<i class="glyphicon glyphicon-duplicate"></i>')
t.title="Duplicate this shape."
z.L(t,"click",new S.n3(this),null)
y.appendChild(t)
z=document
s=z.createElement("div")
s.className="ui deletebutton"
z=J.f(s)
z.sa9(s,'<i class="glyphicon glyphicon-trash"></i>')
s.title="Delete this shape"
z.L(s,"click",new S.n4(this),null)
y.appendChild(s)
z=document
r=z.createElement("div")
r.className="deletescreen"
z=J.f(r)
z.sa9(r,"Delete this shape?<br/>")
z.L(r,"click",new S.n5(),null)
this.fy=r
y.appendChild(r)
z=document
q=z.createElement("div")
q.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
q.title="Delete the shape"
J.a7(q,"click",new S.n6(this),null)
r.appendChild(q)
z=document
p=z.createElement("div")
p.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
p.title="Keep the shape"
J.a7(p,"click",new S.n7(this),null)
r.appendChild(p)
this.a1(0)},
cj:function(a){this.go=!0
this.dy.className="ui component selected"},
cz:function(){this.go=!1
this.dy.className="ui component"},
aK:function(){J.aL(this.dy)
this.dy=null},
J:function(){var z,y,x,w,v,u
z=S.ey(this.ch,!1)
z.b=this.b
z.cy=this.cy
z.db=this.db
z.c=this.c
for(y=0;y<this.b;++y){x=z.d
if(y>=x.length)return H.b(x,y)
x[y]=[]
x=this.d
if(y>=x.length)return H.b(x,y)
x=J.a5(x[y])
for(;x.l();){w=x.gp()
v=z.d
if(y>=v.length)return H.b(v,y)
J.p(v[y],w.J())}x=z.dx
if(y>=10)return H.b(x,y)
x[y]=[]
for(x=this.dx[y],v=x.length,u=0;u<x.length;x.length===v||(0,H.x)(x),++u){w=x[u]
z.dx[y].push(w.J())}}z.u()
return z},
a1:function(a){var z,y,x
if(this.cy)this.dZ()
else{this.u()
for(z=this.cx,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x)z[x].dZ()}z=this.id
J.aS(z.d,0,0,z.a,z.b)
z.iS(this)
z.iN(this,!0)
this.fr.textContent=this.a},
u:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
this.e=[]
for(z=0;z<this.b;++z){y=this.dx
if(z>=10)return H.b(y,z)
x=y[z]
w=[]
for(y=x.length,v=0;v<x.length;x.length===y||(0,H.x)(x),++v){u=x[v]
t=u.gcR()
s=this.d
if(z>=s.length)return H.b(s,z)
if(J.fV(t,J.al(s[z])))continue
t=this.d
if(z>=t.length)return H.b(t,z)
r=J.ad(t[z],u.gcR())
q=J.G(u.gcR(),1)
t=this.d
if(z>=t.length)return H.b(t,z)
if(J.fV(q,J.al(t[z])))q=0
t=this.d
if(z>=t.length)return H.b(t,z)
p=J.ad(t[z],q)
t=J.f(p)
s=J.f(r)
o=J.T(t.gn(p),s.gn(r))
n=J.T(t.gm(p),s.gm(r))
t=J.dm(u)
m=J.a_(o)
l=J.G(s.gn(r),m.Y(o,u.gf6()))
k=J.a_(n)
s=J.G(s.gm(r),k.Y(n,u.gf6()))
m=m.ci(o)
j=new S.aX(t,null,0,null,null)
j.a=J.ay(l)
j.b=J.ay(s)
s=J.a_(m)
l=J.G(k.Y(n,n),s.Y(m,m))
if(typeof l!=="number")H.F(H.I(l))
i=Math.sqrt(l)
t=k.aM(n,i)
m=s.aM(m,i)
s=new S.n(null,null)
s.a=C.a.j(t)
s.b=C.a.j(m)
j.d=s
w.push(j)}y=this.e;(y&&C.e).F(y,w)}this.fV()},
jt:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new Array(10)
z.fixed$length=Array
this.d=H.l(z,[[P.i,S.n]])
this.dx=H.l(new Array(10),[[P.i,S.cY]])
this.b=0
for(z=J.a5(J.el(a));z.l();){y=z.gp();++this.b
x=[]
w=[]
v=J.f(y)
if(v.H(y,"verts")===!0&&!!J.r(v.h(y,"verts")).$isB)for(u=J.a5(J.el(v.h(y,"verts")));u.l();){t=u.gp()
s=J.r(t)
if(!!s.$isB){r=P.lU(J.h5(s.ga_(t)),new S.nb())
q=P.lU(J.h7(s.ga_(t)),new S.nc())
s=J.u(r,0.1)
p=J.u(q,-0.1)
o=new S.n(null,null)
o.a=J.ay(s)
o.b=J.ay(p)
w.push(o)}}if(v.H(y,"rwdk")===!0&&!!J.r(v.h(y,"rwdk")).$isB)v.h(y,"rwdk")
u=v.H(y,"ports")===!0&&!!J.r(v.h(y,"ports")).$isB
if(u)for(v=J.a5(J.el(v.h(y,"ports")));v.l();){n=v.gp()
u=J.r(n)
if(!!u.$isB){t=H.a1(u.h(n,"0"),null,new S.nd())
m=H.af(u.h(n,"1"),new S.ne())
l=u.H(n,"2")===!0?u.h(n,"2"):"NORMAL"
x.push(new S.cY(t,m,$.$get$eR().H(0,l)?$.$get$eR().h(0,l):C.b))}}v=this.dx
u=this.b-1
if(u>>>0!==u||u>=10)return H.b(v,u)
v[u]=x
v=this.d
if(u>=v.length)return H.b(v,u)
v[u]=w}},
dZ:function(){var z,y,x,w,v,u,t
if(this.cy){this.d=[]
this.e=[]
this.b=this.db.gai()
for(z=0;z<this.b;++z){y=this.db.gbw()
if(z>=y.length)return H.b(y,z)
x=[]
for(y=J.a5(y[z]);y.l();){w=y.gp().J()
v=J.f(w)
v.sm(w,J.fX(v.gm(w)))
x.push(w)}y=this.d;(y&&C.e).F(y,x)}for(z=0;z<this.b;++z){y=this.db.gj6()
if(z>=10)return H.b(y,z)
u=y[z]
x=[]
for(y=u.length,t=0;t<u.length;u.length===y||(0,H.x)(u),++t)x.push(u[t].J())
this.dx[z]=x}this.u()}},
aY:function(a,b,c){},
hb:function(a,b){this.id=S.cJ(100,100)
this.ch=a
this.c=b},
C:{
ey:function(a,b){var z,y
z=H.l(new Array(10),[[P.i,S.cY]])
y=J.aU(a)
z=new S.b5(null,[],!1,null,z,null,null,null,null,!1,null,null,null,y,1,!1,null,null,null,null,null,null,null,null)
z.cW(y,1,!1)
z.hb(a,b)
return z},
n8:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.f(a),y=J.a5(z.gI(a)),x=null,w=-1,v=!1,u=-1;y.l();){t=y.gp()
s=J.r(t)
if(s.S(t,"ident"))w=H.a1(z.h(a,t),null,new S.n9())
else if(s.S(t,"launcher_radial"))v=J.y(z.h(a,t),"true")&&!0
else if(s.S(t,"mirror_of"))u=H.a1(z.h(a,t),null,new S.na())
else if(!!J.r(z.h(a,t)).$isB)x=z.h(a,t)}z=J.r(w)
if(z.S(w,-1)||x==null)return
if(!J.y(u,-1)){for(y=$.bx.c,s=y.length,r=0;r<y.length;y.length===s||(0,H.x)(y),++r){q=y[r]
if(J.y(J.ej(q),u)){y=H.l(new Array(10),[[P.i,S.cY]])
s=z.v(w)
y=new S.b5(null,[],!1,null,y,null,null,null,null,!1,null,null,null,s,1,!1,null,null,null,null,null,null,null,null)
y.cW(s,1,!1)
s=new S.hk(100,100,null,null,!0)
p=W.ev(null,null)
o=J.f(p)
o.sar(p,100)
o.sap(p,100)
s.c=p
s.d=J.em(p,"2d")
y.id=s
y.ch=w
y.c=!1
if(q!=null){y.db=q
y.cy=!0
q.gfj().push(y)}else{y.cy=!1
z=y.db
if(z!=null)C.e.ad(z.gfj(),y)
y.db=null}y.dZ()
return y}}return}z=S.ey(w,v)
z.jt(x)
z.u()
return z}}},
n0:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.k1.ck(0,y)
z.b_(a)
z.a2(a)
z.c9(a)},null,null,2,0,null,0,"call"]},
n1:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.k1.cl(z)},null,null,2,0,null,0,"call"]},
n2:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.k1.cm(z)},null,null,2,0,null,0,"call"]},
n3:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.k1.cv(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
n4:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a.fy.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
n5:{"^":"a:0;",
$1:[function(a){var z=J.f(a)
z.a2(a)
z.b_(a)},null,null,2,0,null,0,"call"]},
n6:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.k1.bZ(z)},null,null,2,0,null,0,"call"]},
n7:{"^":"a:0;a",
$1:[function(a){var z=this.a.fy.style
z.display="none"},null,null,2,0,null,0,"call"]},
nb:{"^":"a:8;",
$1:function(a){return 0}},
nc:{"^":"a:8;",
$1:function(a){return 0}},
nd:{"^":"a:8;",
$1:function(a){return 0}},
ne:{"^":"a:8;",
$1:function(a){return 0.5}},
n9:{"^":"a:8;",
$1:function(a){return-1}},
na:{"^":"a:8;",
$1:function(a){return-1}},
cY:{"^":"k;cR:a<,f6:b<,D:c*",
J:function(){return new S.cY(this.a,this.b,this.c)}},
ap:{"^":"k;B:a>,f1:b<,bV:c<,cD:d<,fd:e<",
v:function(a){var z,y,x
z=this.a
y=H.e(new H.da(H.fN(this),null))+": "+z
x=this.b
return y+(x!==z?" ("+x+")":"")},
C:{"^":"Ap<"}},
rC:{"^":"a:15;",
$2:function(a,b){return J.bZ(J.am(a),J.am(b))}},
rD:{"^":"a:15;",
$2:function(a,b){return J.bZ(J.am(a),J.am(b))}},
rE:{"^":"a:15;",
$2:function(a,b){return J.bZ(J.am(a),J.am(b))}},
nA:{"^":"ap;a,b,c,d,e",C:{"^":"cP<",
eD:function(a,b,c,d){var z=new S.nA(a,null,b,c,d)
z.b=a
return z}}},
nD:{"^":"ap;a,b,c,d,e",C:{"^":"eK<",
eJ:function(a,b,c,d){var z=new S.nD(a,null,b,c,d)
z.b=a
return z}}},
nC:{"^":"ap;a,b,c,d,e",C:{"^":"eI<",
dB:function(a,b,c,d){var z=new S.nC(a,null,b,c,d)
z.b=a
return z}}},
nE:{"^":"ap;a,b,c,d,e",C:{"^":"eM<",
eL:function(a,b,c,d){var z=new S.nE(a,null,b,c,d)
z.b=a
return z}}},
ny:{"^":"ap;a,b,c,d,e",C:{"^":"eC<",
cN:function(a,b,c,d){var z=new S.ny(a,null,b,c,d)
z.b=a
return z}}},
nz:{"^":"ap;a,b,c,d,e",C:{"^":"cO<",
ak:function(a,b,c,d){var z=new S.nz(a,null,b,c,d)
z.b=a
return z}}},
nB:{"^":"ap;a,b,c,d,e",C:{"^":"dA<",
V:function(a,b,c,d){var z=new S.nB(a,null,b,c,d)
z.b=a
return z}}},
nx:{"^":"ap;a,b,c,d,e",C:{"^":"eB<",
bE:function(a,b,c,d){var z=new S.nx(a,null,b,c,d)
z.b=a
return z}}},
nH:{"^":"k;W:a<,aT:b<,cH:c?,d,e,f,r,c8:x@,y",
J:function(){var z,y
z=S.eN(null)
y=this.a.J()
z.a=y
y.r=z
return z},
aK:function(){this.a.aD()
J.aL(this.b)
this.b=null},
cj:function(a){var z,y
this.r=!0
z=this.a.ay(0)
y=this.a
y.K(y.x)
this.c.f.appendChild(z)
this.b.className="ui component selected"},
cz:function(){this.r=!1
this.a.aD()
this.b.className="ui component"},
dv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=document
y=z.createElement("div")
y.className="ui component"
J.a7(y,"click",new S.nI(this),null)
this.b=y
y.appendChild(this.y.c)
z=document
x=z.createElement("span")
this.d=x
x.textContent="Faction name"
x.className="componentname"
y.appendChild(x)
z=document
w=z.createElement("span")
this.e=w
w.textContent="Faction info"
w.className="componentinfo"
y.appendChild(w)
z=document
v=z.createElement("div")
v.className="ui sortbutton sortleft"
z=J.f(v)
z.sa9(v,'<i class="glyphicon glyphicon-menu-left"></i>')
v.title="Move this faction left"
z.L(v,"click",new S.nJ(this),null)
y.appendChild(v)
z=document
u=z.createElement("div")
u.className="ui sortbutton sortright"
z=J.f(u)
z.sa9(u,'<i class="glyphicon glyphicon-menu-right"></i>')
u.title="Move this faction right"
z.L(u,"click",new S.nK(this),null)
y.appendChild(u)
z=document
t=z.createElement("div")
t.className="ui copybutton"
z=J.f(t)
z.sa9(t,'<i class="glyphicon glyphicon-duplicate"></i>')
t.title="Duplicate this faction."
z.L(t,"click",new S.nL(this),null)
y.appendChild(t)
z=document
s=z.createElement("div")
s.className="ui deletebutton"
z=J.f(s)
z.sa9(s,'<i class="glyphicon glyphicon-trash"></i>')
s.title="Delete this faction"
z.L(s,"click",new S.nM(this),null)
y.appendChild(s)
z=document
r=z.createElement("div")
r.className="deletescreen"
z=J.f(r)
z.sa9(r,"Delete this faction?<br/>")
z.L(r,"click",new S.nN(),null)
this.f=r
y.appendChild(r)
z=document
q=z.createElement("div")
q.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
q.title="Delete the faction"
J.a7(q,"click",new S.nO(this),null)
r.appendChild(q)
z=document
p=z.createElement("div")
p.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
p.title="Keep the faction"
J.a7(p,"click",new S.nP(this),null)
r.appendChild(p)
z=this.a
z.K(z.x)},
ay:function(a){return this.dv(a,-1)},
dX:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=H.q(this.a.a.h(0,"name"),"$isb6")
y=this.d
J.aq(y,z.x===!0?J.dn(z.ch,"\\n","<br/>"):"")
x="<span title='Faction ID'>#"+H.e(H.q(this.a.a.h(0,"ident"),"$isaj").ch)+"</span><br/>"
w=H.q(this.a.a.h(0,"aiflags"),"$isbs")
if(w.x===!0)for(y=w.cx,v=y.gI(y),v=v.gA(v);v.l();){u=v.gp()
if(y.h(0,u)===!0){if(u.gcD()==null)continue
x+="<span class='glyphicon glyphicon-"+H.e(u.gcD())+"' title='"+u.gfd()+"'></span>"}}J.aq(this.e,x)
y=this.y
J.aS(y.d,0,0,y.a,y.b)
t=[]
s=J.bh(this.a.a.h(0,"primaries"))
r=$.dD.a.ga5().h(0,"fillColor")
q=$.dD.a.ga5().h(0,"lineColor")
r.sao(0)
r.saj(0)
r.sam(0)
q.sao(40)
q.saj(40)
q.sam(40)
p=$.dE.a.ga5().h(0,"fillColor")
o=$.dE.a.ga5().h(0,"lineColor")
p.sao(0)
p.saj(0)
p.sam(0)
o.sao(40)
o.saj(40)
o.sam(40)
n=$.dF.a.ga5().h(0,"fillColor")
m=$.dF.a.ga5().h(0,"lineColor")
n.sao(0)
n.saj(0)
n.sam(0)
m.sao(40)
m.saj(40)
m.sam(40)
y=J.Y(s)
if(y.ak(s,0))t.push($.dD)
if(y.ak(s,1))t.push($.dE)
if(y.ak(s,2))t.push($.dF)
if(J.bh(this.a.a.h(0,"color0"))!=null&&this.a.a.h(0,"color0").aI()===!0){l=this.a.a.h(0,"color0")
r.sao(l.gao())
r.saj(l.gaj())
r.sam(l.gam())
q.sao(C.c.au(l.gao(),3))
q.saj(C.c.au(l.gaj(),3))
q.sam(C.c.au(l.gam(),3))}k=J.bh(this.a.a.h(0,"color1"))
if(y.ak(s,1)&&k!=null&&this.a.a.h(0,"color1").aI()===!0){j=this.a.a.h(0,"color1")
p.sao(j.gao())
p.saj(j.gaj())
p.sam(j.gam())
o.sao(C.c.au(j.gao(),3))
o.saj(C.c.au(j.gaj(),3))
o.sam(C.c.au(j.gam(),3))}i=J.bh(this.a.a.h(0,"color2"))
if(y.ak(s,2)&&i!=null&&this.a.a.h(0,"color2").aI()===!0){h=this.a.a.h(0,"color2")
n.sao(h.gao())
n.saj(h.gaj())
n.sam(h.gam())
m.sao(C.c.au(h.gao(),3))
m.saj(C.c.au(h.gaj(),3))
m.sam(C.c.au(h.gam(),3))}this.y.f2(t)
$.be.dY()
S.kL()},
a1:function(a){var z=this.a
z.K(z.x)},
aY:function(a,b,c){this.a.aY(0,b,c)},
ig:function(){var z,y,x,w,v,u,t,s,r,q
z=this.a.a.h(0,"color0")
y=this.a.a.h(0,"color1")
x=this.a.a.h(0,"color2")
if(z.aI()===!0&&J.c0(z)===!0){w=J.bh(z)
v=J.N(w)
u=v.h(w,"r")
if(typeof u!=="number")return H.C(u)
t=0+u
u=v.h(w,"g")
if(typeof u!=="number")return H.C(u)
s=0+u
v=v.h(w,"b")
if(typeof v!=="number")return H.C(v)
r=0+v
q=1}else{t=0
s=0
r=0
q=0}if(y.aI()===!0&&J.c0(y)===!0){++q
w=J.bh(y)
v=J.N(w)
u=v.h(w,"r")
if(typeof u!=="number")return H.C(u)
t+=u
u=v.h(w,"g")
if(typeof u!=="number")return H.C(u)
s+=u
v=v.h(w,"b")
if(typeof v!=="number")return H.C(v)
r+=v}if(x.aI()===!0&&J.c0(x)===!0){++q
w=J.bh(x)
v=J.N(w)
u=v.h(w,"r")
if(typeof u!=="number")return H.C(u)
t+=u
u=v.h(w,"g")
if(typeof u!=="number")return H.C(u)
s+=u
v=v.h(w,"b")
if(typeof v!=="number")return H.C(v)
r+=v}if(q>0)return P.ae(["r",C.a.bz(t,q),"g",C.a.bz(s,q),"b",C.a.bz(r,q)])
return P.ae(["r",127,"g",127,"b",127])},
hc:function(a){var z=S.cJ(100,100)
z.e=!1
this.y=z
z=this.a
if(z==null){z=S.eZ()
this.a=z}z.r=this},
C:{
eN:function(a){var z=new S.nH(a,null,null,null,null,null,!1,null,null)
z.hc(a)
return z}}},
nI:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.ck(0,y)
z.b_(a)
z.a2(a)
z.c9(a)},null,null,2,0,null,0,"call"]},
nJ:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.cl(z)},null,null,2,0,null,0,"call"]},
nK:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.cm(z)},null,null,2,0,null,0,"call"]},
nL:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.cv(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
nM:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a.f.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
nN:{"^":"a:0;",
$1:[function(a){var z=J.f(a)
z.a2(a)
z.b_(a)},null,null,2,0,null,0,"call"]},
nO:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.c.bZ(z)},null,null,2,0,null,0,"call"]},
nP:{"^":"a:0;a",
$1:[function(a){var z=this.a.f.style
z.display="none"},null,null,2,0,null,0,"call"]},
X:{"^":"k;aT:a<,jc:b<,B:d>,bV:e<,aA:f*,e5:r@,ax:x*,cB:y*",
ag:["b0",function(){var z=document
z=z.createElement("div")
this.b=z
J.aq(z,"<div class='field' >"+this.d+"</span>")
z.title=this.e
return this.b}],
ay:function(a){var z,y,x,w
z=document
this.a=z.createElement("tr")
z=document
y=z.createElement("td")
x=W.ax("checkbox")
z=J.f(x)
z.sbs(x,this.x)
x.setAttribute("fieldid",""+this.Q)
if(this.y){this.x=!0
z.sbs(x,!0)
z.saG(x,!0)
x.title="Required field"}z.L(x,"change",new S.oh(),null)
this.c=x
y.appendChild(x)
z=document
w=z.createElement("td")
w.appendChild(this.ag())
z=this.a
z.appendChild(y)
z.appendChild(w)
return this.a},
aD:["cV",function(){var z=this.a
if(z==null)return
J.aL(z)
this.a=null}],
aI:function(){if(this.r==null)return!0
return this.fR(this)},
K:function(a){var z,y
z=this.z
if(z!==a)return
this.z=!z
this.aH(a)
if(this.a!=null){z=this.aI()
y=this.a
if(z===!0){z=y.style
z.display=""}else{z=y.style
z.display="none"}if(this.x===!0)y.className=""
else y.className="inactive"}z=this.f
if(z!=null)z.K(a)},
aH:["e8",function(a){}],
a1:function(a){this.K(this.z)},
aK:["fW",function(){$.$get$m().i(0,this.Q,null)}],
aa:function(a,b){},
X:function(a,b,c,d){S.ai(b,(d?this.d+"=":"")+"=VALUE,",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){return},
as:function(a){return},
an:function(a){var z=this.c
if(z!=null)J.en(z,!0)
this.x=!0},
e3:function(a){if(a)this.x=!0
this.y=a},
aZ:function(){return this.e3(!0)},
fR:function(a){return this.r.$1(a)}},
oh:{"^":"a:5;",
$1:[function(a){var z,y,x,w
z=H.q(J.a9(a),"$isho")
y=H.a1(z.getAttribute("fieldid"),null,null)
x=$.$get$m().h(0,y)
w=J.f(x)
w.sax(x,z.checked)
w.a1(x)},null,null,2,0,null,0,"call"]},
cW:{"^":"X;W:ch<,cx,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=this.b0()
y=this.ch
if(y!=null){y=S.cK(this.Q,y.ay(0))
this.cx=y
z.appendChild(y.a)
if(this.x===!0)this.cx.c1(0)}return z},
aD:function(){var z=this.ch
if(z!=null)z.aD()
this.cV()},
aH:["fX",function(a){var z=this.ch
if(z!=null)z.K(a)}],
aK:function(){var z=this.ch
if(z!=null)z.aK()
this.fW()},
aa:function(a,b){if(!!J.r(b).$isB&&this.ch!=null)this.ch.aa(0,b)},
X:function(a,b,c,d){if(this.ch!=null){S.ai(b,d?this.d+"=":"",c,!1)
this.ch.bN(0,b,c,!1)
return!0}return!1},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){return S.co(this.d,this.e,this.ch.J())},
as:function(a){if(this.x===!0&&this.ch!=null)return this.ch
return},
cZ:function(a,b,c){var z=this.ch
if(z!=null)z.f=this},
C:{
co:function(a,b,c){var z,y
z=$.d
$.d=z+1
y=new S.cW(c,null,null,null,null,a,b,null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.cZ(a,b,c)
return y}}},
iG:{"^":"cW;cy,db,bU:dx@,aW:dy*,fr,fe:fx<,ch,cx,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s
z=document
z=z.createElement("div")
this.b=z
J.aq(z,"<div class='field' >"+this.d+"</span>")
z.title=this.e
z=document
z=z.createElement("div")
z.className="enumreadout"
z.textContent="[No block specified]"
this.db=z
this.b.appendChild(z)
z=document
this.fr=z.createElement("div")
z=document
y=z.createElement("div")
x=W.ax("radio")
z=J.f(x)
z.sbs(x,!0)
w=this.Q
x.id="mode_0_"+w
z.sB(x,"mode_"+w)
z.sG(x,"0")
z.L(x,"change",new S.nQ(),null)
z=document
v=z.createElement("label")
J.eo(v,"mode_0_"+w)
v.textContent="Specify block ID:"
u=W.ax("number")
z=J.f(u)
z.saP(u,"1")
u.setAttribute("fieldid",""+w)
z.sG(u,H.e(this.dx))
z.L(u,"change",new S.nR(),null)
this.fx=u
t=W.ax("radio")
z=J.f(t)
z.sbs(t,!1)
t.id="mode_1_"+w
z.sB(t,"mode_"+w)
z.sG(t,"1")
z.L(t,"change",new S.nS(),null)
z=document
s=z.createElement("label")
J.eo(s,"mode_1_"+w)
s.textContent="Define block below:"
y.appendChild(x)
y.appendChild(v)
y.appendChild(u)
z=document
y.appendChild(z.createElement("br"))
y.appendChild(t)
y.appendChild(s)
this.fr.appendChild(y)
z=this.ch
if(z!=null)this.fr.appendChild(z.ay(0))
z=S.cK(w,this.fr)
this.cx=z
if(this.x===!0&&this.dy===1)z.c1(0)
this.b.appendChild(this.cx.a)
return this.b},
aa:function(a,b){var z,y
if(!!J.r(b).$isB){z=S.bL(!0)
this.ch=z
z.f=this
z.aa(0,b)
this.dy=1}else if(typeof b==="string"){this.dy=0
y=!S.bd(b)?"0":b
this.dx=H.a1(""+J.bA(H.af(C.f.cS(y,"0x")?H.e(H.a1(C.f.bc(y,2),16,null)):y,null)),null,null)}},
aH:function(a){var z,y,x,w
this.fX(a)
z=this.fr
if(z!=null){y=this.Q
H.q(z.querySelector("#mode_0_"+y),"$isjA").checked=this.dy===0
H.q(this.fr.querySelector("#mode_1_"+y),"$isjA").checked=this.dy===1}if(this.dy===1&&this.ch==null){z=S.bL(!0)
this.ch=z
z.f=this
z.K(z.x)
z=this.fr
if(z!=null){z.appendChild(this.ch.ay(0))
z=this.ch
z.K(z.x)}}z=this.db
if(z!=null)if(this.dy===0){x=H.a1(J.cF(this.fx),null,null)
w=this.as(0)
z=w!=null&&!J.y(J.a8(w,"name"),"")
y=this.db
if(z)y.textContent="[Block with ID "+H.e(x)+': "'+H.e(J.a8(w,"name"))+'"]'
else y.textContent="[Block with ID "+H.e(x)+"]"}else z.textContent="[Block defined inside"+(J.c0(this.ch.a.h(0,"name"))===!0?': "'+H.e(this.ch.E(0,"name"))+'"':"")+"]"},
X:function(a,b,c,d){var z
if(this.dy===0){z=d?this.d+"=":""
S.ai(b,z+H.e(this.dx)+",",0,!0)
return!0}else if(this.ch!=null){S.ai(b,this.d+"=",c,!1)
this.ch.bN(0,b,c,!1)
return!0}return!1},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.e
x=$.d
$.d=x+1
w=new S.iG(!1,null,0,0,null,null,null,null,null,null,null,z,y,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
w.cZ(z,y,null)
w.dy=this.dy
w.dx=this.dx
z=this.ch
if(z==null)z=null
else{z=z.J()
z.f=w}w.ch=z
return w},
as:function(a){var z,y
if(this.x===!0)if(this.dy===0){if(J.a6(this.dx,0))for(z=$.aH.b,z=z.ga_(z),z=z.gA(z);z.l();){y=z.gp()
if(y.gW()!=null&&J.y(J.a8(y.gW(),"ident"),this.dx))return y.gW()}}else{z=this.ch
if(z!=null)return z}return}},
nQ:{"^":"a:5;",
$1:[function(a){var z,y
z=$.$get$m().h(0,H.a1(J.dq(H.q(J.a9(a),"$isW").id,7),null,null))
y=J.f(z)
y.saW(z,0)
y.a1(z)},null,null,2,0,null,0,"call"]},
nR:{"^":"a:5;",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
z.value=""+J.bA(H.af(z.value,null))
y=$.$get$m().h(0,H.a1(z.getAttribute("fieldid"),null,null))
y.sbU(H.a1(z.value,null,null))
J.er(y)},null,null,2,0,null,0,"call"]},
nS:{"^":"a:5;",
$1:[function(a){var z,y
z=$.$get$m().h(0,H.a1(J.dq(H.q(J.a9(a),"$isW").id,7),null,null))
y=J.f(z)
y.saW(z,1)
y.a1(z)},null,null,2,0,null,0,"call"]},
eP:{"^":"X;",
eL:function(){var z,y
z=this.ch
y=this.dw(z.length)
y.y=!0
y.x=!0
z.push(y)
return y},
eN:function(a){var z,y,x,w,v,u
if(this.cy!=null){z=document
y=z.createElement("div")
y.className="listcontainer"
z=document
x=z.createElement("div")
x.className="listoverlay"
x.textContent="Delete?"
x.title=""
z=document
w=z.createElement("span")
w.className="glyphicon glyphicon-ok"
w.title="Delete this item"
z=document
v=z.createElement("span")
v.className="glyphicon glyphicon-remove"
v.title="Keep this item"
x.appendChild(w)
S.U(w,new S.o8(this,a))
x.appendChild(v)
S.U(v,new S.o9(x))
y.appendChild(x)
z=document
u=z.createElement("div")
u.className="listbutton glyphicon glyphicon-trash"
u.title="Delete item"
S.U(u,new S.oa(x))
y.appendChild(u)
y.appendChild(a.ag())
this.cy.appendChild(y)}},
aH:function(a){this.e8(a)},
ag:function(){var z,y,x,w,v,u
z=this.b0()
y=document
y=y.createElement("div")
y.className="ui"
this.cy=y
y=document
x=y.createElement("div")
x.title="Add a new item to the list"
y=document
w=y.createElement("div")
w.className="listbutton glyphicon glyphicon-star"
S.U(w,new S.ob(this))
x.appendChild(w)
y=document
y=y.createElement("span")
v=y.style
v.marginRight="13px"
y.textContent=" Add new item"
x.appendChild(y)
this.cy.appendChild(x)
for(y=this.ch,v=y.length,u=0;u<y.length;y.length===v||(0,H.x)(y),++u)this.eN(y[u])
y=S.cK(this.Q,this.cy)
this.cx=y
z.appendChild(y.a)
if(this.x===!0)this.cx.c1(0)
return z},
du:function(a){var z,y,x,w,v,u,t
for(z=this.ch,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x){w=z[x]
v=w.J()
u=J.f(w)
t=J.f(v)
t.sax(v,u.gax(w))
t.scB(v,u.gcB(w))
a.push(v)}},
as:function(a){var z,y,x,w
if(this.x===!0){z=[]
for(y=this.ch,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w)z.push(J.bh(y[w]))
return z}return[]},
aa:function(a,b){var z,y
z=J.r(b)
if(!z.$isB)return
for(z=J.a5(z.ga_(b));z.l();){y=z.gp()
this.eL().aa(0,y)}},
X:function(a,b,c,d){var z,y,x,w
S.ai(b,(d?this.d+"=":"")+"{",c,!0)
for(z=this.ch,y=z.length,x=c+1,w=0;w<z.length;z.length===y||(0,H.x)(z),++w)J.mo(z[w],b,x,!1)
S.ai(b,"},",c,!0)
return!1},
at:function(a,b,c){return this.X(a,b,c,!0)}},
o8:{"^":"a:0;a,b",
$1:function(a){var z=this.b
C.e.ad(this.a.ch,z)
J.aL(z.gjc().parentElement)}},
o9:{"^":"a:0;a",
$1:function(a){var z=this.a.style
z.visibility="hidden"}},
oa:{"^":"a:0;a",
$1:function(a){var z=this.a.style
z.visibility="visible"}},
ob:{"^":"a:0;a",
$1:function(a){var z=this.a
z.eN(z.eL())
z.an(0)
z.K(z.z)}},
eQ:{"^":"eP;ch,cx,cy,a,b,c,d,e,f,r,x,y,z,Q",
dw:function(a){var z,y
z=this.d+" #"+a
y=$.d
$.d=y+1
z=new S.iO("",null,null,null,z,"Save name of a ship, minus the .lua file extension.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
return z},
J:function(){var z,y,x,w
z=this.d
y=[]
x=$.d
$.d=x+1
w=new S.eQ(y,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
this.du(y)
return w}},
iN:{"^":"eP;ch,cx,cy,a,b,c,d,e,f,r,x,y,z,Q",
dw:function(a){var z,y
z=$.d
$.d=z+1
y=new S.eQ([],null,null,null,null,null,"Ship group","A list of ship save names",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
return y},
J:function(){var z,y,x,w
z=this.d
y=[]
x=$.d
$.d=x+1
w=new S.iN(y,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
this.du(y)
return w}},
iJ:{"^":"eP;ch,cx,cy,a,b,c,d,e,f,r,x,y,z,Q",
dw:function(a){var z,y
z=$.d
$.d=z+1
y=new S.iI(0,0,0,"Inner point weight",null,"Outer point weight",null,null,null,null,"Fleet","Faction id and fleet spawn weight in P for the region",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
return y},
J:function(){var z,y,x,w
z=this.d
y=[]
x=$.d
$.d=x+1
w=new S.iJ(y,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
this.du(y)
return w}},
dJ:{"^":"X;ch,cx,cy,db,dx,dy,fr,fx,fy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v
z=document
z=z.createElement("div")
this.b=z
J.aq(z,"<div class='field' >"+this.d+"</span>")
z.title=this.e
z=document
z=z.createElement("div")
z.className="enumreadout"
z.textContent="[No block selected!]"
this.dx=z
this.b.appendChild(z)
z=document
this.dy=z.createElement("div")
this.cx=H.q(this.f.a.h(0,"scale"),"$isaj").ch
this.fx=H.l([],[S.jF])
y=H.l([],[S.b4])
C.e.av(y,$.$get$dX())
C.e.av(y,H.xH($.bx.c,"$isi",[S.b5],"$asi"))
for(z=y.length,x=0;x<y.length;y.length===z||(0,H.x)(y),++x){w=y[x]
v=S.rO(w,this.cx,J.y(w,this.ch),150)
v.e=this
this.dy.appendChild(v.c)
this.fx.push(v)}z=S.cK(this.Q,this.dy)
this.fr=z
this.b.appendChild(z.a)
return this.b},
aa:function(a,b){var z,y
if(typeof b==="string"){this.fy=b
z=S.rS()
if(z.H(0,b))this.ch=z.h(0,b)
else{y=H.a1(b,null,new S.oe())
if(!J.y(y,-1)){this.cy=y
this.ch=$.$get$aF()}else this.ch=$.$get$c5()}}},
aH:function(a){var z,y,x,w,v,u,t,s,r
this.e8(a)
z=this.ch
y=J.r(z)
if(!!y.$isb5||y.S(z,$.$get$aF())){z=this.ch
if(z instanceof S.b5){if(!J.y(H.q(z,"$isb5").ch,this.cy))this.ch=$.$get$aF()
else if(!C.e.M($.bx.c,this.ch))this.ch=$.$get$aF()}else for(z=$.bx.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x){w=z[x]
if(J.y(J.ej(w),this.cy)){this.ch=w
break}}}if(this.db){z=this.f.r
y=$.aH.d
z=(z==null?y==null:z===y)&&this.b!=null}else z=!1
if(z){this.db=!1
v=this.fr.d
z=this.b
u=z.parentElement
J.aL(z)
this.b=null
u.appendChild(this.ag())
if(v)this.fr.c1(0)}if(this.dx!=null)if(J.y(this.ch,$.$get$aF()))this.dx.textContent="[Missing custom shape ID: "+H.e(this.cy)+"]"
else{z=this.ch
y=J.r(z)
t=this.dx
if(!!y.$isb5)t.textContent="[Custom shape ID: "+H.e(H.q(z,"$isb5").ch)+"]"
else t.textContent="["+H.e(y.gB(z))+"]"}s=H.q(this.f.a.h(0,"scale"),"$isaj")
if(!(s.x===!0&&!J.y(s.ch,this.cx)))z=s.x!==!0&&!J.y(this.cx,1)
else z=!0
if(z){this.cx=s.x===!0?s.ch:1
for(z=this.fx,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x){r=z[x]
r.d=this.cx
r.a1(0)}}},
fH:function(a){var z,y,x,w,v
for(z=this.fx,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x){w=z[x]
v=a===w
if(w.f!==v){w.f=v
w.a1(0)}}z=a.a
this.ch=z
if(z instanceof S.b5)this.cy=H.q(z,"$isb5").ch
this.an(0)
this.K(this.z)},
X:function(a,b,c,d){var z,y
z=this.ch
if(z!=null){y=d?this.d+"=":""
S.ai(b,y+H.e(J.am(z))+",",c,!0)
return!0}return!1},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){return S.iM(this.d,this.e,this.ch)},
as:function(a){if(this.x===!0){if(this.ch!=null)if(J.fW(this.f.E(0,"scale"),this.ch.gai()))return this.ch
return $.$get$aF()}return $.$get$c5()},
hd:function(a,b,c){if(this.ch==null)this.ch=$.$get$c5()},
C:{
iM:function(a,b,c){var z,y
z=$.d
$.d=z+1
y=new S.dJ(c,1,0,!0,null,null,null,[],"",null,null,null,a,b,null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.hd(a,b,c)
return y}}},
oe:{"^":"a:8;",
$1:function(a){return-1}},
aj:{"^":"X;G:ch*,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:["e9",function(){var z,y,x
z=this.b0()
y=W.ax("number")
x=J.f(y)
x.saP(y,"1")
x.sG(y,H.e(this.ch))
x.L(y,"change",new S.o7(this),null)
z.appendChild(y)
if(this.dx!=null){y.className="shortfield"
x=document
x=x.createElement("div")
x.className="inlineblock"
x.textContent=this.ca(this)
this.dy=x
z.appendChild(x)}return z}],
aa:function(a,b){if(typeof b==="number"&&Math.floor(b)===b)this.ch=b
else if(typeof b==="string")this.ch=H.a1(b,null,null)},
X:function(a,b,c,d){var z=d?this.d+"=":""
S.ai(b,z+H.e(this.ch)+",",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.d
$.d=x+1
w=new S.aj(y,2147483647,-2147483647,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
w.db=w.ch
w.cx=this.cx
w.cy=this.cy
w.db=this.db
return w},
as:function(a){if(this.x===!0)return this.ch
return this.db},
aH:function(a){if(this.dx!=null&&this.dy!=null)this.dy.textContent=this.ca(this)},
ca:function(a){return this.dx.$1(a)}},
o7:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
y=this.a
z.value=H.e(C.c.ds(J.bA(H.af(z.value,null)),y.cy,y.cx))
y.ch=H.a1(z.value,null,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
bt:{"^":"aj;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=this.e9()
y=z.childNodes
if(1>=y.length)return H.b(y,1)
H.q(y[1],"$isaZ").min="0"
return z},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.d
$.d=x+1
w=new S.bt(0,2147483647,-2147483647,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
w.db=w.ch
w.ch=y
w.db=y
w.cx=this.cx
w.cy=this.cy
w.db=this.db
return w}},
dI:{"^":"aj;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=this.e9()
y=z.childNodes
if(1>=y.length)return H.b(y,1)
H.q(y[1],"$isaZ").min="0"
return z},
X:function(a,b,c,d){S.ai(b,H.e(this.ch)+",",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.d
$.d=x+1
w=new S.dI(0,2147483647,-2147483647,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
w.db=w.ch
w.ch=y
w.db=y
w.cx=this.cx
w.cy=this.cy
w.db=this.db
w.x=this.x
return w}},
v:{"^":"X;G:ch*,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x
z=this.b0()
y=W.ax("number")
x=J.f(y)
x.saP(y,"0.01")
x.sG(y,H.e(this.ch))
x.L(y,"change",new S.nY(this),null)
z.appendChild(y)
if(this.dx!=null){y.className="shortfield"
x=document
x=x.createElement("div")
x.className="inlineblock"
x.textContent=this.ca(this)
this.dy=x
z.appendChild(x)}return z},
aa:function(a,b){if(typeof b==="number")this.ch=H.fM(b)
else if(typeof b==="string")this.ch=H.af(b,null)},
X:function(a,b,c,d){var z=d?this.d+"=":""
S.ai(b,z+H.e(this.ch)+",",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.d
$.d=x+1
w=new S.v(y,1/0,-1/0,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,w)
w.db=w.ch
w.cx=this.cx
w.cy=this.cy
w.db=this.db
w.dx=this.dx
return w},
as:function(a){if(this.x===!0)return this.ch
return this.db},
aH:function(a){if(this.dx!=null&&this.dy!=null)this.dy.textContent=this.ca(this)},
ca:function(a){return this.dx.$1(a)}},
nY:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
if(!J.aT(z.value,".")){y=z.value
if(y==null)return y.t()
z.value=y+".0"}y=this.a
z.value=H.e(J.m9(H.af(z.value,null),y.cy,y.cx))
y.ch=H.af(z.value,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
iK:{"^":"X;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w
z=this.b0()
y=W.ax("number")
x=J.f(y)
x.saP(y,"1")
y.className="pairfield"
x.sG(y,H.e(this.ch))
y.title=this.cy
x.L(y,"change",new S.o3(this),null)
w=W.ax("number")
x=J.f(w)
x.saP(w,"1")
w.className="pairfield"
x.sG(w,H.e(this.cx))
w.title=this.dx
x.L(w,"change",new S.o4(this),null)
z.appendChild(W.cM(this.db,null,null))
z.appendChild(y)
z.appendChild(W.cM(this.dy,null,null))
z.appendChild(w)
return z},
aa:function(a,b){var z,y
z=J.r(b)
if(!!z.$isB){if(z.H(b,"0")===!0)this.ch=H.a1(z.h(b,"0"),null,new S.o5())
if(z.H(b,"1")===!0)this.cx=H.a1(z.h(b,"1"),null,new S.o6())}else if(typeof b==="string"){y=H.a1(b,null,null)
this.ch=y
this.cx=y}},
X:function(a,b,c,d){S.ai(b,(d?this.d+"=":"")+"{"+H.e(this.ch)+", "+H.e(this.cx)+"},",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=this.cx
w=$.d
$.d=w+1
z=new S.iK(y,x,this.cy,this.db,this.dx,this.dy,null,null,null,z,this.e,null,null,!1,!1,!1,w)
$.$get$m().i(0,w,z)
return z},
as:function(a){if(this.x===!0)return P.ae(["val0",this.ch,"val1",this.cx])
return P.ae(["val0",0,"val1",0])}},
o3:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
z.value=""+J.bA(H.af(z.value,null))
y=this.a
y.ch=H.a1(z.value,null,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
o4:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
z.value=""+J.bA(H.af(z.value,null))
y=this.a
y.cx=H.a1(z.value,null,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
o5:{"^":"a:8;",
$1:function(a){return 0}},
o6:{"^":"a:8;",
$1:function(a){return 0}},
dG:{"^":"X;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w
z=this.b0()
y=W.ax("number")
x=J.f(y)
x.saP(y,"0.01")
y.className="pairfield"
x.sG(y,H.e(this.ch))
y.title=this.cy
x.L(y,"change",new S.nU(this),null)
w=W.ax("number")
x=J.f(w)
x.saP(w,"0.01")
w.className="pairfield"
x.sG(w,H.e(this.cx))
w.title=this.dx
x.L(w,"change",new S.nV(this),null)
x=this.db
if(x!=null)z.appendChild(W.cM(x,null,null))
z.appendChild(y)
x=this.dy
if(x!=null)z.appendChild(W.cM(x,null,null))
z.appendChild(w)
return z},
aa:function(a,b){var z,y
z=J.r(b)
if(!!z.$isB){if(z.H(b,"0")===!0)this.ch=H.af(z.h(b,"0"),new S.nW())
if(z.H(b,"1")===!0)this.cx=H.af(z.h(b,"1"),new S.nX())}else if(typeof b==="string"){y=H.af(b,null)
this.ch=y
this.cx=y}},
X:function(a,b,c,d){S.ai(b,(d?this.d+"=":"")+"{"+H.e(this.ch)+", "+H.e(this.cx)+"},",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=this.cx
w=$.d
$.d=w+1
z=new S.dG(y,x,this.cy,this.db,this.dx,this.dy,null,null,null,z,this.e,null,null,!1,!1,!1,w)
$.$get$m().i(0,w,z)
return z},
as:function(a){if(this.x===!0)return P.ae(["0",this.ch,"1",this.cx])
return P.ae(["0",0,"1",0])}},
nU:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
if(!J.aT(z.value,".")){y=z.value
if(y==null)return y.t()
z.value=y+".0"}y=this.a
y.ch=H.af(z.value,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
nV:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
if(!J.aT(z.value,".")){y=z.value
if(y==null)return y.t()
z.value=y+".0"}y=this.a
y.cx=H.af(z.value,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
nW:{"^":"a:8;",
$1:function(a){return 0}},
nX:{"^":"a:8;",
$1:function(a){return 0}},
dH:{"^":"dG;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q"},
eO:{"^":"iK;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q"},
cn:{"^":"dG;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
as:function(a){if(this.x===!0)return P.ae(["0",this.ch,"1",this.cx])
return P.ae(["0",1,"1",0])}},
iI:{"^":"dG;fr,ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s
z=document
z=z.createElement("div")
this.b=z
z.title=this.e
y=W.ax("number")
z=J.f(y)
z.saP(y,"1")
y.className="pairfield"
z.sG(y,H.e(this.fr))
y.title="Faction"
z.L(y,"change",new S.o0(this),null)
x=W.ax("number")
z=J.f(x)
z.saP(x,"0.01")
x.className="pairfield"
z.sG(x,H.e(this.ch))
w=this.cy
x.title=w
z.L(x,"change",new S.o1(this),null)
v=W.ax("number")
z=J.f(v)
z.saP(v,"0.01")
v.className="pairfield"
z.sG(v,H.e(this.cx))
u=this.dx
v.title=u
z.L(v,"change",new S.o2(this),null)
z=this.b
t=document
t=t.createElement("span")
t.textContent="#"
t.title="Faction number"
s=t.style
s.fontWeight="bold"
s=t.style
s.marginLeft="8px"
z.appendChild(t)
this.b.appendChild(y)
z=this.b
t=document
t=t.createElement("span")
t.className="glyphicon glyphicon-record"
t.title=w
z.appendChild(t)
this.b.appendChild(x)
t=this.b
z=document
z=z.createElement("span")
z.className="glyphicon glyphicon-fullscreen"
z.title=u
t.appendChild(z)
this.b.appendChild(v)
return this.b},
aa:function(a,b){var z,y,x,w,v
z=J.r(b)
if(!!z.$isB){if(z.H(b,"ident")===!0)this.fr=H.a1(z.h(b,"ident"),null,null)
for(z=J.a5(z.ga_(b));z.l();){y=z.gp()
x=J.r(y)
if(!!x.$isB)for(x=J.a5(x.ga_(y));x.l();){w=x.gp()
v=J.r(w)
if(!!v.$isB)if(v.gk(w)===2)if(v.H(w,"0")===!0&&v.H(w,"1")===!0){if(J.y(v.h(w,"0"),0))this.ch=J.ay(v.h(w,"1"))
if(J.y(v.h(w,"0"),1))this.cx=J.ay(v.h(w,"1"))}}}}},
X:function(a,b,c,d){S.ai(b,(d?this.d+"=":"")+"{"+H.e(this.fr)+", { {0, "+H.e(this.ch)+"}, {1, "+H.e(this.cx)+"} }},",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w,v
z=this.d
y=this.fr
x=this.ch
w=this.cx
v=$.d
$.d=v+1
z=new S.iI(y,x,w,"Inner point weight",null,"Outer point weight",null,null,null,null,z,this.e,null,null,!1,!1,!1,v)
$.$get$m().i(0,v,z)
return z},
as:function(a){if(this.x===!0)return P.ae(["faction",this.fr,"0",this.ch,"1",this.cx])
return P.ae(["faction",0,"0",0,"1",0])}},
o0:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
z.value=""+J.bA(H.af(z.value,null))
y=this.a
y.fr=H.a1(z.value,null,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
o1:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
if(!J.aT(z.value,".")){y=z.value
if(y==null)return y.t()
z.value=y+".0"}y=this.a
y.ch=H.af(z.value,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
o2:{"^":"a:5;a",
$1:[function(a){var z,y
z=H.q(J.a9(a),"$isaZ")
if(!S.bd(z.value))z.value="0"
if(!J.aT(z.value,".")){y=z.value
if(y==null)return y.t()
z.value=y+".0"}y=this.a
y.cx=H.af(z.value,null)
y.an(0)
y.K(y.z)},null,null,2,0,null,0,"call"]},
b6:{"^":"X;G:ch*,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x
z=this.b0()
y=W.ax("text")
x=J.f(y)
x.sG(y,this.ch)
x.L(y,"change",new S.og(this),null)
z.appendChild(y)
return z},
aa:function(a,b){if(typeof b==="string")this.ch=b},
X:function(a,b,c,d){S.ai(b,(d?this.d+"=":"")+'"'+H.e(this.ch)+'",',c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x
z=this.d
y=this.ch
x=$.d
$.d=x+1
z=new S.b6(y,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
return z},
as:function(a){if(this.x===!0)return this.ch
return""}},
og:{"^":"a:5;a",
$1:[function(a){var z=this.a
z.ch=H.q(J.a9(a),"$iskW").value
z.an(0)
z.K(z.z)},null,null,2,0,null,0,"call"]},
iO:{"^":"b6;ch,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=document
z=z.createElement("div")
this.b=z
z.title=this.e
y=W.ax("text")
y.className="compacttext"
z=J.f(y)
z.sG(y,this.ch)
z.L(y,"change",new S.of(this),null)
this.b.appendChild(y)
return this.b},
J:function(){var z,y,x
z=this.d
y=this.ch
x=$.d
$.d=x+1
z=new S.iO(y,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
return z}},
of:{"^":"a:5;a",
$1:[function(a){var z=this.a
z.ch=H.q(J.a9(a),"$iskW").value
z.an(0)
z.K(z.z)},null,null,2,0,null,0,"call"]},
iL:{"^":"b6;ch,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v
z=document
z=z.createElement("div")
this.b=z
J.aq(z,"<div class='field' >"+this.d+"</span>")
z.title=this.e
y=this.b
z=document
x=z.createElement("textarea")
z=J.f(x)
z.sjD(x,1)
z.sG(x,J.dn(this.ch,"\\n","\n"))
z.L(x,"change",new S.oc(this),null)
z.L(x,"input",new S.od(),null)
w=S.fT(z.gG(x),43)
z=x.style
v=H.e(P.S(1,w)*15+2)+"px"
z.height=v
y.appendChild(x)
return y},
J:function(){var z,y,x
z=this.d
y=this.ch
x=$.d
$.d=x+1
z=new S.iL("",null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
z.ch=y
return z}},
oc:{"^":"a:5;a",
$1:[function(a){var z,y,x,w
z=H.q(J.a9(a),"$isfm")
y=S.fT(z.value,43)
x=z.style
x.height="auto"
x=z.style
w=H.e(P.S(1,y)*15+2)+"px"
x.height=w
x=this.a
w=z.value
w.toString
H.b1("\\n")
x.ch=H.ed(w,"\n","\\n")
x.an(0)
x.K(x.z)},null,null,2,0,null,0,"call"]},
od:{"^":"a:5;",
$1:[function(a){var z,y,x,w
z=H.q(J.a9(a),"$isfm")
y=S.fT(z.value,43)
x=z.style
x.height="auto"
x=z.style
w=H.e(P.S(1,y)*15+2)+"px"
x.height=w},null,null,2,0,null,0,"call"]},
an:{"^":"X;ao:ch@,aj:cx@,am:cy@,db,dx,dy,fr,fx,fy,go,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s,r
z=this.b0()
y="colour_"+this.Q
x=W.ax("text")
x.id=y
document.querySelector("#haxbox").appendChild(x)
w=J.ad($.$get$fL(),"$").eO(["#"+y])
v=this.dx
u=this.cu(v)
t=v?"hex8":"hex"
s=H.l(new P.j3([]),[null])
v=P.ae(["color",u,"preferredFormat",t,"showInput",!0,"showPalette",!0,"palette",s,"localStorageKey",v?"rwdk_alpha":"rwdk","showAlpha",v,"showButtons",!1,"maxSelectionSize",16])
w.bX("spectrum",[P.fI(P.pu(v))])
r=H.q(J.ad(w.bX("spectrum",["replacer"]),0),"$ishy")
w.bX("on",["change",new S.nT(this)])
J.aL(x)
z.appendChild(x)
J.aL(r)
z.appendChild(r)
return z},
aD:function(){var z="colour_"+this.Q
J.ad($.$get$fL(),"$").eO(["#"+z]).bX("spectrum",["destroy"])
this.cV()},
aa:function(a,b){if(typeof b==="string")this.f0(b,!0)},
eY:function(a){if(a)return(this.cy|this.cx<<8|this.ch<<16|this.db<<24)>>>0
return(this.cy|this.cx<<8|this.ch<<16)>>>0},
iq:function(){return this.eY(!1)},
eZ:function(a){if(a)return C.f.fm(C.c.fz(this.eY(!0),16),8,"0")
return C.f.fm(C.c.fz(this.iq(),16),6,"0")},
ir:function(){return this.eZ(!1)},
cu:function(a){if(a)return"rgba("+this.ch+","+this.cx+","+this.cy+","+H.e(this.db/255)+")"
return"#"+this.ir()},
ct:function(){return this.cu(!1)},
f0:function(a,b){var z,y,x
z=0
if(J.dp(a,"#"))a="0x"+J.dq(a,1)
if(J.dp(a,"0x"))z=H.a1(a,null,null)
else try{y=this.fx
C.x.sdt(y,"")
C.x.sjY(y,"")
z=H.a1(a,16,null)}catch(x){H.a3(x)
try{z=H.a1(a,null,null)}catch(x){H.a3(x)
z=2155905152}}if(J.al(a)===6){if(b)this.db=255}else this.db=J.ee(z,24)&255
this.ch=J.ee(z,16)&255
this.cx=J.ee(z,8)&255
this.cy=J.m1(z,255)},
iB:function(a){return this.f0(a,!1)},
X:function(a,b,c,d){S.ai(b,(d?this.d+"=":"")+"0x"+this.eZ(this.dx)+",",c,!0)
return!0},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x
z=this.d
y=$.d
$.d=y+1
x=new S.an(127,127,127,255,this.dx,null,null,null,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.ch=this.ch
x.cx=this.cx
x.cy=this.cy
x.db=this.db
return x},
as:function(a){if(this.x===!0)return P.ae(["r",this.ch,"g",this.cx,"b",this.cy,"a",this.db])
return}},
nT:{"^":"a:1;a",
$2:[function(a,b){var z=this.a
z.iB(J.aU(b))
z.an(0)
z.K(z.z)},null,null,4,0,null,22,19,"call"]},
bs:{"^":"X;ch,cx,cy,db,dx,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.b0()
if(this.ch){y=document
x=y.createElement("select")
z.appendChild(x)
y=this.cx
v=y.gI(y)
v=v.gA(v)
while(!0){if(!v.l()){w=null
break}u=v.gp()
if(y.h(0,u)===!0){w=u
break}}if(w==null){v=y.gI(y)
w=v.gP(v)
y.i(0,w,!0)}for(y=y.gI(y),y=y.gA(y);y.l();){u=y.gp()
t=W.qC("","",null,!1)
t.value=J.am(u)
t.textContent=u.gf1()
t.title=u.gbV()
x.appendChild(t)}y=J.f(x)
y.sG(x,J.am(w))
y.L(x,"change",new S.nZ(this,x),null)}else{y=document
s=y.createElement("div")
y=document
r=y.createElement("table")
s.appendChild(r)
for(y=this.cx,v=y.gI(y),v=v.gA(v),q=this.Q;v.l();){u=v.gp()
p=document
o=p.createElement("tr")
p=document
n=p.createElement("td")
o.appendChild(n)
m=W.ax("checkbox")
m.setAttribute("fieldid",""+q)
p=J.f(m)
p.sbs(m,y.h(0,u))
l=J.f(u)
m.id="enum_"+q+"_"+H.e(l.gB(u))
p.L(m,"change",new S.o_(this,u),null)
n.appendChild(m)
p=document
k=p.createElement("td")
p=document
j=p.createElement("label")
j.className="enum"
j.textContent=u.gf1()
j.title=u.gbV()
J.eo(j,"enum_"+q+"_"+H.e(l.gB(u)))
k.appendChild(j)
o.appendChild(k)
r.appendChild(o)}y=document
y=y.createElement("div")
this.db=y
y.className="enumreadout"
z.appendChild(y)
q=S.cK(q,s)
this.dx=q
z.appendChild(q.a)}return z},
aD:function(){if(this.db!=null)this.db=null
this.cV()},
aH:function(a){var z,y,x,w,v,u
if(!this.ch&&this.db!=null){for(z=this.cx,y=z.gI(z),y=y.gA(y),x="[",w=!0,v=!1;y.l();){u=y.gp()
if(z.h(0,u)===!0){if(w)w=!1
else x+="|<wbr>"
x+="<span title='"+u.gbV()+"'>"+H.e(J.am(u))+"</span>"
v=!0}}x+="]"
J.aq(this.db,x)
if(!v){J.en(this.c,!1)
this.x=!1}}},
aa:function(a,b){var z,y,x,w,v,u
if(typeof b!=="string")return
z=b.split("|")
for(y=z.length,x=this.cy,w=this.cx,v=0;v<z.length;z.length===y||(0,H.x)(z),++v){u=z[v]
if(x.H(0,u))w.i(0,x.h(0,u),!0)}},
X:function(a,b,c,d){var z,y,x,w,v,u
for(z=this.cx,y=z.gI(z),y=y.gA(y),x="",w=!0,v=!1;y.l();){u=y.gp()
if(z.h(0,u)===!0){if(w)w=!1
else x+="|"
x=C.f.t(x,J.am(u))
v=!0}}if(v){S.ai(b,(d?this.d+"=":"")+x+",",c,!0)
return!0}return!1},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w,v,u
z=H.l([],[S.ap])
for(y=this.cx,x=y.gI(y),x=x.gA(x);x.l();)z.push(x.gp())
w=S.bl(this.d,this.e,z,!1)
w.ch=this.ch
for(x=y.gI(y),x=x.gA(x),v=w.cx;x.l();){u=x.gp()
v.i(0,u,y.h(0,u))}return w},
as:function(a){var z,y,x,w
if(this.x===!0)if(this.ch)for(z=this.cx,y=z.gI(z),y=y.gA(y);y.l();){x=y.gp()
if(z.h(0,x)===!0)return x}else{w=[]
for(z=this.cx,y=z.gI(z),y=y.gA(y);y.l();){x=y.gp()
if(z.h(0,x)===!0)w.push(x)}return w}return},
cY:function(a,b,c,d){var z,y,x,w,v
for(z=c.length,y=this.cx,x=this.cy,w=0;w<c.length;c.length===z||(0,H.x)(c),++w){v=c[w]
y.i(0,v,!1)
x.i(0,J.am(v),v)}},
C:{
bl:function(a,b,c,d){var z,y,x
z=H.l(new H.a2(0,null,null,null,null,null,0),[S.ap,P.bc])
y=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.ap])
x=$.d
$.d=x+1
y=new S.bs(d,z,y,null,null,null,null,null,a,b,null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.cY(a,b,c,d)
return y}}},
nZ:{"^":"a:5;a,b",
$1:[function(a){var z,y,x
for(z=this.a,y=z.cx,x=y.gI(y),x=x.gA(x);x.l();)y.i(0,x.gp(),!1)
y.i(0,z.cy.h(0,J.cF(this.b)),!0)
z.an(0)},null,null,2,0,null,0,"call"]},
o_:{"^":"a:5;a,b",
$1:[function(a){var z=this.a
z.cx.i(0,this.b,H.q(J.a9(a),"$isho").checked)
z.an(0)
z.K(z.z)},null,null,2,0,null,0,"call"]},
iH:{"^":"bs;ch,cx,cy,db,dx,a,b,c,d,e,f,r,x,y,z,Q",
aH:function(a){var z,y,x,w,v,u
if(!this.ch&&this.db!=null){for(z=this.cx,y=z.gI(z),y=y.gA(y),x="{ ",w=!0,v=!1;y.l();){u=y.gp()
if(z.h(0,u)===!0){if(w)w=!1
else x+=", "
x+="<span title='"+u.gbV()+"'>"+H.e(J.am(u))+"</span>"
v=!0}}x+=" }"
J.aq(this.db,x)
if(!v){J.en(this.c,!1)
this.x=!1}}},
aa:function(a,b){var z,y,x,w
z=J.r(b)
if(!z.$isB)return
for(z=J.a5(z.ga_(b)),y=this.cy,x=this.cx;z.l();){w=J.aU(z.gp())
if(y.H(0,w))x.i(0,y.h(0,w),!0)}},
X:function(a,b,c,d){var z,y,x,w,v,u
for(z=this.cx,y=z.gI(z),y=y.gA(y),x="",w=!0,v=!1;y.l();){u=y.gp()
if(z.h(0,u)===!0){if(w)w=!1
else x+=","
x=C.f.t(x,J.am(u))
v=!0}}if(v){S.ai(b,(d?this.d+"=":"")+"{ "+x+" },",c,!0)
return!0}return!1},
at:function(a,b,c){return this.X(a,b,c,!0)},
J:function(){var z,y,x,w,v,u,t,s,r
z=H.l([],[S.ap])
for(y=this.cx,x=y.gI(y),x=x.gA(x);x.l();)z.push(x.gp())
x=this.d
w=this.e
v=H.l(new H.a2(0,null,null,null,null,null,0),[S.ap,P.bc])
u=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.ap])
t=$.d
$.d=t+1
s=new S.iH(!1,v,u,null,null,null,null,null,x,w,null,null,!1,!1,!1,t)
$.$get$m().i(0,t,s)
s.cY(x,w,z,!1)
s.ch=this.ch
for(x=y.gI(y),x=x.gA(x);x.l();){r=x.gp()
v.i(0,r,y.h(0,r))}return s}},
x7:{"^":"a:0;",
$1:function(a){var z,y
z=S.ex(null)
$.aH.F(0,z)
H.q(z.a.a.h(0,"ident"),"$isaj").ch=S.hs()
y=z.a
y.K(y.x)}},
x8:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#blockloadinput")
y=z.style
y.visibility="visible"
y=J.f(z)
y.bH(z)
y.b4(z)
z=z.style
z.visibility="hidden"}},
x9:{"^":"a:0;",
$1:function(a){S.jD($.aH,"blocks")}},
xk:{"^":"a:0;",
$1:function(a){var z=document.querySelector("#alertbackground").style
z.display="block"
z=document.querySelector("#idreorderbox").style
z.display="block"}},
xv:{"^":"a:0;",
$1:function(a){var z
S.wM()
z=document.querySelector("#alertbackground").style
z.display="none"
z=document.querySelector("#idreorderbox").style
z.display="none"}},
xw:{"^":"a:0;",
$1:function(a){var z=document.querySelector("#alertbackground").style
z.display="none"
z=document.querySelector("#idreorderbox").style
z.display="none"}},
xx:{"^":"a:0;",
$1:function(a){S.di("Clear block palette","Are you sure you want to delete all blocks in the palette? This cannot be undone.","Delete","Cancel",new S.x6())}},
x6:{"^":"a:3;",
$0:function(){$.aH.aF(0)}},
xy:{"^":"a:5;",
$1:[function(a){var z,y,x
z=H.q(J.a9(a),"$iscX")
y=z.files
if(0>=y.length)return H.b(y,0)
x=y[0]
S.qE(x)
z.value=""},null,null,2,0,null,0,"call"]},
xz:{"^":"a:0;",
$1:function(a){var z,y
z=S.ey(0,!1)
z.b=1
z.dx[0]=[]
y=z.d
if(0>=y.length)return H.b(y,0)
y[0]=[]
z.u()
$.bx.F(0,z)
z.a1(0)}},
xA:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#shapeloadinput")
y=z.style
y.visibility="visible"
y=J.f(z)
y.bH(z)
y.b4(z)
z=z.style
z.visibility="hidden"}},
xB:{"^":"a:0;",
$1:function(a){}},
xa:{"^":"a:0;",
$1:function(a){S.di("Clear shape palette","Are you sure you want to delete all shapes in the palette? This cannot be undone.","Delete","Cancel",new S.x5())}},
x5:{"^":"a:3;",
$0:function(){$.bx.aF(0)}},
xb:{"^":"a:5;",
$1:[function(a){var z,y,x
z=H.q(J.a9(a),"$iscX")
y=z.files
if(0>=y.length)return H.b(y,0)
x=y[0]
S.qS(x)
z.value=""},null,null,2,0,null,0,"call"]},
xc:{"^":"a:0;",
$1:function(a){var z,y
z=S.eN(null)
$.by.F(0,z)
y=z.a
y.K(y.x)}},
xd:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#factionloadinput")
y=z.style
y.visibility="visible"
y=J.f(z)
y.bH(z)
y.b4(z)
z=z.style
z.visibility="hidden"}},
xe:{"^":"a:0;",
$1:function(a){S.jD($.by,"factions")}},
xf:{"^":"a:0;",
$1:function(a){S.di("Clear faction palette","Are you sure you want to delete all factions in the palette? This cannot be undone.","Delete","Cancel",new S.x4())}},
x4:{"^":"a:3;",
$0:function(){$.by.aF(0)}},
xg:{"^":"a:5;",
$1:[function(a){var z,y,x
z=H.q(J.a9(a),"$iscX")
y=z.files
if(0>=y.length)return H.b(y,0)
x=y[0]
S.qI(x)
z.value=""},null,null,2,0,null,0,"call"]},
xh:{"^":"a:0;",
$1:function(a){var z,y
z=S.fe(null)
$.be.F(0,z)
y=z.a
y.K(y.x)}},
xi:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#regionloadinput")
y=z.style
y.visibility="visible"
y=J.f(z)
y.bH(z)
y.b4(z)
z=z.style
z.visibility="hidden"}},
xj:{"^":"a:0;",
$1:function(a){S.rJ()}},
xl:{"^":"a:0;",
$1:function(a){S.di("Clear region list","Are you sure you want to delete all regions in the list? This cannot be undone.","Delete","Cancel",new S.x3())}},
x3:{"^":"a:3;",
$0:function(){$.be.aF(0)}},
xm:{"^":"a:5;",
$1:[function(a){var z,y,x
z=H.q(J.a9(a),"$iscX")
y=z.files
if(0>=y.length)return H.b(y,0)
x=y[0]
S.qN(x)
z.value=""},null,null,2,0,null,0,"call"]},
xn:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#shiploadinput")
y=z.style
y.visibility="visible"
y=J.f(z)
y.bH(z)
y.b4(z)
z=z.style
z.visibility="hidden"}},
xo:{"^":"a:0;",
$1:function(a){S.di("Clear ship list","Are you sure you want to clear all ships in the list? Any unsaved id changes will be lost.","Clear","Cancel",new S.x2())}},
x2:{"^":"a:3;",
$0:function(){S.rY()}},
xp:{"^":"a:0;",
$1:function(a){S.t4()}},
xq:{"^":"a:5;",
$1:[function(a){var z,y,x,w,v
z=H.q(J.a9(a),"$iscX")
for(y=z.files,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){v=y[w]
S.qW(v)}z.value=""},null,null,2,0,null,0,"call"]},
xr:{"^":"a:0;",
$1:function(a){var z=document.querySelector("#alertbox").style
z.display="none"
z=document.querySelector("#alertbackground").style
z.display="none"
document.querySelector("#alerttext").textContent=""
document.querySelector("#alerttitle").textContent=""}},
xs:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#confirmbox").style
z.display="none"
z=document.querySelector("#alertbackground").style
z.display="none"
document.querySelector("#confirmtext").textContent=""
document.querySelector("#confirmtitle").textContent=""
if($.e4!=null){z=document.querySelector("#confirmbuttonyes")
y=$.e4
z.toString
if(y!=null)J.ef(z,"click",y,null)}}},
xt:{"^":"a:16;",
$1:function(a){var z=$.aH.d
if(z!=null)H.q(H.q(z,"$ishr").a.a.h(0,"shape"),"$isdJ").db=!0
$.aH.dY()}},
xu:{"^":"a:16;",
$1:function(a){$.be.dY()
S.kL()}},
bu:{"^":"k;a5:a<,b,c,d,aT:e<,f,aA:r*,x,y",
ay:function(a){var z,y,x,w,v,u,t
z=document
z=z.createElement("div")
this.e=z
z.className="ui"
z=document
y=z.createElement("table")
this.e.appendChild(y)
for(z=this.a,z=z.ga_(z),z=z.gA(z),x=this.b,w=this.c;z.l();){v=z.gp()
y.appendChild(J.h0(v))
if(x.M(0,v)){u=document
t=u.createElement("tr")
t.className="break"
J.aq(t,"<td colspan='2'><div class='break'></div></td>")
y.appendChild(t)
w.push(t)}}return this.e},
aD:function(){if(this.e==null)return
for(var z=this.a,z=z.ga_(z),z=z.gA(z);z.l();)z.gp().aD()
J.aL(this.e)
this.e=null},
O:function(a,b){var z
if(a==null)return
z=J.f(a)
this.a.i(0,z.gB(a),a)
z.saA(a,this)
if(b!=null)a.se5(b)
this.y=a},
q:function(a){return this.O(a,null)},
a4:function(){var z=this.y
if(z==null)return
if(this.a.is(0,z))this.b.F(0,this.y)},
K:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.x
if(z!==a)return
this.x=!z
this.aH(a)
for(z=this.a,z=z.ga_(z),z=z.gA(z);z.l();)z.gp().K(a)
if(this.e!=null)for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x){w=z[x]
v=J.mc(this.e).h(0,0)
u=J.f(v)
t=J.hc(u.gbh(v),w)
if(t!==0){r=t-1
while(!0){if(!(r>=0)){s=0
break}q=J.ad(u.gbh(v),r)
p=J.f(q)
if(J.aT(p.gdt(q),"break")){s=0
break}else if(J.h4(p.gbb(q))!=="none"){s=1
break}--r}}else s=0
if(t!==J.al(u.gbh(v))-1){r=t+1
while(!0){if(!(r<J.al(u.gbh(v)))){o=!1
break}q=J.ad(u.gbh(v),r)
p=J.f(q)
if(J.aT(p.gdt(q),"break")){o=!0
break}else if(J.h4(p.gbb(q))!=="none"){n=s+1
s=n
o=!1
break}++r}}else o=!1
if(s>0&&!o){u=w.style;(u&&C.v).scA(u,"")}else{u=w.style;(u&&C.v).scA(u,"none")}}z=this.f
if(z!=null)z.K(a)
z=this.r
if(z!=null)z.dX()},
aH:function(a){},
a1:function(a){this.K(this.x)},
aK:function(){this.aD()
for(var z=this.a,z=z.ga_(z),z=z.gA(z);z.l();)z.gp().aK()},
aa:function(a,b){J.cc(b,new S.qv(this,b))
this.K(this.x)},
bN:function(a,b,c,d){var z,y,x,w,v,u,t,s
S.ai(b,"{",d?c:0,!0)
for(z=this.a,z=z.ga_(z),z=z.gA(z),y=c+1;z.l();){x=z.gp()
w=J.f(x)
if(w.gax(x)===!0&&x.aI()===!0)w.at(x,b,y)}z=this.d
if(z.gff(z)){v="-- "+$.f0+"={"
for(w=z.gI(z),w=w.gA(w);w.l();){u=w.gp()
t=z.h(0,u)
s=H.e(t)+", "+H.e(J.mh(t))
H.fR(s)
v+=H.e(u)+"="
v=typeof t==="string"?v+('"'+t+'",'):v+(H.e(t)+",")}S.ai(b,v+"},",y,!0)}S.ai(b,"},",c,!0)},
aY:function(a,b,c){return this.bN(a,b,c,!0)},
J:function(){var z,y
z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
y=new S.bu(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
this.cw(y)
y.K(y.x)
return y},
cw:function(a){var z,y,x,w,v,u,t
for(z=this.a,y=z.gI(z),y=y.gA(y),x=this.b;y.l();){w=z.h(0,y.gp())
v=w.J()
u=J.lM(w)
t=J.lM(v)
t.scB(v,u.gcB(w))
t.sax(v,u.gax(w))
if(v!=null){a.O(v,w.ge5())
if(x.M(0,w))a.a4()}}},
E:function(a,b){var z=this.a
if(z.H(0,b))return J.bh(z.h(0,b))
return},
b9:function(a){var z=this.E(0,a)
if(typeof z==="number")return z
return 0}},
qv:{"^":"a:10;a,b",
$2:[function(a,b){var z,y,x,w,v
if($.$get$f7().H(0,a))a=$.$get$f7().h(0,a)
z=this.a
y=z.a
if(y.H(0,a)){J.mp(y.h(0,a),!0)
J.mj(y.h(0,a),b)}else if(J.y(a,$.f0)&&!!J.r(J.ad(this.b,a)).$isB)for(y=this.b,x=J.N(y),w=J.a5(J.h6(x.h(y,a))),z=z.d;w.l();){v=w.gp()
z.i(0,v,J.ad(x.h(y,a),v))}},null,null,4,0,null,4,1,"call"]},
pG:{"^":"bu;ii:z<,iA:Q<,j7:ch<,a,b,c,d,e,f,r,x,y",
eR:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=$.$get$cQ()
y=S.D(this,"features",z)
x=this.E(0,"durability")
w=this.E(0,"shape")
v=J.r(w)
if(v.S(w,$.$get$aF())){this.z=0
this.Q=0
this.ch=!1
return}u=P.a0(w.gai(),this.E(0,"scale"))
v=v.gdn(w)
t=u-1
if(t>>>0!==t||t>=v.length)return H.b(v,t)
s=J.u(v[t],100)
v=J.Y(x)
r=v.ak(x,4)?0+v.aM(x,10)*P.S(100,s):0+J.bf(v.Y(x,1000),P.S(100,s))
if(S.D(this,"features",$.$get$eF()))r+=1e6
if(S.D(this,"features",$.$get$ci())){q=this.E(0,"cannon")
if(S.D(this,"features",$.$get$cj())){v=this.E(0,"chargeMaxTime")
if(typeof v!=="number")return H.C(v)
p=1/v}else p=J.a8(q,"roundsPerSec")
v=J.f(q)
t=P.a0(400,v.E(q,"damage"))
if(typeof p!=="number")return H.C(p)
o=P.a0(3000,v.E(q,"range"))
n=H.fM(v.E(q,"muzzleVel"))
if(typeof n!=="number")return n.aM()
n=C.d.ds(n/1400,0.5,2)
v=v.E(q,"explosive")!=null?2*P.S(1,q.b9("explodeRadius")/10):1
m=S.D(this,"features",$.$get$cm())?1:0.5
r+=15*t*p*(o/1200)*n*v*m}if(S.D(this,"features",$.$get$cl())){l=this.E(0,"laser")
v=J.f(l)
k=v.E(l,"range")
j=P.a0(1500,k)/1000
if(J.bq(k,500))j/=3
t=H.fM(v.E(l,"pulsesPerSec"))
if(typeof t!=="number")return t.ak()
if(t>0){t=v.E(l,"pulseAvailability")
if(typeof t!=="number")return H.C(t)
j*=t}if(S.D(this,"features",$.$get$cm()))j*=3
if(S.D(this,"features",$.$get$cj()))j*=2
r+=j*P.S(15*C.d.dk(l.b9("damage")),3*Math.sqrt(H.P(P.S(v.E(l,"immobilizeForce"),v.E(l,"linearForce")))))}if(S.D(this,"features",$.$get$dx())){i=this.E(0,"cannonBoost")
v=J.f(i)
t=J.ad(H.q(v.E(i,"damage"),"$isB"),"1")
if(typeof t!=="number")return H.C(t)
o=J.ad(H.q(v.E(i,"roundsPerSec"),"$isB"),"0")
if(typeof o!=="number")return H.C(o)
r=r+7.5*t+300*o+15*J.bf(J.ad(H.q(v.E(i,"range"),"$isB"),"1"),100)*J.bf(J.ad(H.q(v.E(i,"muzzleVel"),"$isB"),"1"),100)}if(S.D(this,"features",$.$get$cR()))r+=this.b9("explodeDamage")*P.S(1,this.b9("explodeRadius")/10)
if(S.D(this,"features",$.$get$dz())){v=this.E(0,"meleeDamage")
if(typeof v!=="number")return H.C(v)
r+=40*v}if(S.D(this,"features",$.$get$aV())){h=this.E(0,"replicateBlock")
if(h==null){this.z=0
this.ch=!1
return}h.eR()
g=h.giA()
g=S.D(h,"features",z)?g*1.5:g*0.5
z=this.E(0,"replicateTime")
if(typeof z!=="number")return H.C(z)
r+=15*g/z}if(S.D(this,"features",$.$get$cT())){f=this.E(0,"shield")
z=J.f(f)
v=z.E(f,"regen")
if(typeof v!=="number")return H.C(v)
z=z.E(f,"strength")
if(typeof z!=="number")return H.C(z)
r+=(15*v+z)*(f.b9("radius")/50)}if(S.D(this,"features",$.$get$bG()))r+=2.5*Math.sqrt(H.P(this.b9("thrusterForce")*(P.S(1,this.b9("thrusterBoost"))/2)))
if(S.D(this,"features",$.$get$ck()))if(!y){z=this.E(0,"generatorCapacityPerSec")
if(typeof z!=="number")return H.C(z)
r+=30*z}if(S.D(this,"features",$.$get$dy()))r+=1e4
if(S.D(this,"features",$.$get$cS()))r+=this.b9("photosynthPerSec")*1000
if(J.y(this.E(0,"lifetime"),-1)){if(y)r+=500
if(S.D(this,"features",$.$get$cU()))r+=500}this.Q=r
this.z=C.d.cK(r/100)
this.ch=!0},
aH:function(a){this.eR()},
J:function(){var z=S.bL(!1)
this.cw(z)
z.K(z.x)
return z},
hg:function(a){var z,y,x
z=$.d
$.d=z+1
y=new S.dI(0,2147483647,-2147483647,0,null,null,null,null,null,"ident","Block ID. Must be unique. Subject to relocation.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
y.ch=0
y.db=0
y.e3(!a)
this.q(y)
y=$.d
$.d=y+1
z=new S.aj(0,2147483647,-2147483647,0,null,null,null,null,null,"group","Faction ID of the faction this block belongs to.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
z.aZ()
this.q(z)
this.q(S.bl("features","Block features.",$.$get$dA(),!1))
this.a4()
z=$.d
$.d=z+1
y=new S.b6("",null,null,null,"name","Block name, displayed in-game.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
y=$.d
$.d=y+1
z=new S.iL("",null,null,null,"blurb","Block description, displayed in-game.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.ch=""
this.q(z)
this.a4()
this.q(S.iM("shape","The shape which the block will take in-game. Some shapes cannot use certain scales.",null))
z=$.d
$.d=z+1
y=new S.bt(0,2147483647,-2147483647,0,null,null,null,null,null,"scale","Block scale.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
y.ch=1
y.db=1
y.cy=1
y.cx=20
this.q(y)
y=$.d
$.d=y+1
z=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"fillColor","Primary block fill colour.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
z=$.d
$.d=z+1
y=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"fillColor1","Secondary block fill colour. Block colour cycles between fillColor and this. If left unspecified, defaults to the primary colour.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
y=$.d
$.d=y+1
z=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"lineColor","Block outline colour.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
this.a4()
z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.qn(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
z.q(S.bl("flags","Command behaviour flags.",$.$get$cO(),!1))
y=$.d
$.d=y+1
x=new S.aj(0,2147483647,-2147483647,0,null,null,null,null,null,"faction","Faction ID which this core will be assigned to when created.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
x=$.d
$.d=x+1
y=new S.b6("",null,null,null,"blueprint","When specified, this type of core will only build into this blueprint. Filename minus extension (20_test.lua -> 20_test).",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
z.q(y)
z=S.co("command","Command properties.",z)
z.aZ()
this.O(z,new S.pH())
this.a4()
z=$.d
$.d=z+1
y=new S.aj(0,2147483647,-2147483647,0,new S.pI(),null,null,null,null,"points","Points value (P cost) of the block. Will be calculated by the game if set to 0 or not specified. The estimate is not 100% accurate, but close enough in nearly all cases.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.v(1,1/0,-1/0,0,new S.pJ(),null,null,null,null,"durability","Health = durability * block area.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)
z=$.d
$.d=z+1
y=new S.v(0.1,1/0,-1/0,0,new S.pU(),null,null,null,null,"density","Mass = density * block area.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.v(3.3,1/0,-1/0,0,new S.q4(),null,null,null,null,"growRate","Block regrowth rate. Higher = faster.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)
z=$.d
$.d=z+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"armor","Reduces incoming damage from non-explosive projectile weapons by the amount specified. Totally ineffective against any other damage source, making it useless against most weapons in the game. Use is not recommended as it leads to confusing and inconsistent behaviour. Included only for completeness.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.v(5,1/0,-1/0,0,null,null,null,null,null,"meleeDamage","Melee damage multiplier for melee blocks.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.qd())
z=$.d
$.d=z+1
y=new S.v(-1,1/0,-1/0,0,null,null,null,null,null,"lifetime","Time before the block deconstructs. -1 is infinite.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
this.O(S.bl("bindingId","Weapon button binding. Only required if you wish to override the default binding behaviour.",$.$get$eC(),!0),new S.qe())
this.a4()
y=$.d
$.d=y+1
z=new S.v(60,1/0,-1/0,0,null,null,null,null,null,"seedLifetime","Time before this seed expires when rooted. Checked instead of lifetime once the seed takes root.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.qf())
z=$.d
$.d=z+1
y=new S.v(100,1/0,-1/0,0,null,null,null,null,null,"launchSpeed","",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.O(y,new S.qg())
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"launchCapacity","",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.qh())
z=$.d
$.d=z+1
y=new S.v(-1,1/0,-1/0,0,null,null,null,null,null,"launchLifetime","",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.O(y,new S.qi())
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"launchResources","",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.pK())
this.a4()
z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.qu(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
y=$.d
$.d=y+1
x=new S.v(100,1/0,-1/0,0,null,null,null,null,null,"strength","Shield health.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
x=$.d
$.d=x+1
y=new S.v(20,1/0,-1/0,0,null,null,null,null,null,"regen","Health regenerated per second. Also power per second needed to regenerate.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
z.q(y)
y=$.d
$.d=y+1
x=new S.v(40,1/0,-1/0,0,null,null,null,null,null,"radius","Shield size.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
x=$.d
$.d=x+1
y=new S.v(3,1/0,-1/0,0,null,null,null,null,null,"delay","Delay in seconds after collapse before a shield begins to regenerate.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
z.q(y)
y=$.d
$.d=y+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"armor","Reduces incoming damage from non-explosive projectile weapons by the amount specified. Totally ineffective against any other damage source, making it useless against most weapons in the game. Use is not recommended as it leads to confusing and inconsistent behaviour. Included only for completeness.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
z.a4()
x=$.d
$.d=x+1
y=new S.an(127,127,127,255,!0,null,null,null,null,null,null,null,null,"color","Shield colour when stable. Brighter colours appear more opaque.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
z.q(y)
y=$.d
$.d=y+1
x=new S.an(127,127,127,255,!0,null,null,null,null,null,null,null,null,"lineColor","Shield edge colour.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
z.q(x)
x=$.d
$.d=x+1
y=new S.an(127,127,127,255,!0,null,null,null,null,null,null,null,null,"damagedColor","Shield colour when taking damage. Brighter colours appear more opaque.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
z.q(y)
z=S.co("shield","Shield properties. Reliant upon the SHIELD feature.",z)
z.aZ()
this.O(z,new S.pL())
this.a4()
z=$.d
$.d=z+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"capacity","R capacity of the block.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.v(400,1/0,-1/0,0,null,null,null,null,null,"tractorRange","Resource collection range for tractor blocks.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.pM())
z=$.d
$.d=z+1
y=new S.v(1,1/0,-1/0,0,null,null,null,null,null,"photosynthPerSec","Resources generated per second by photosynth blocks.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.O(y,new S.pN())
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"generatorCapacityPerSec","Energy generated per second by generators.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.pO())
z=$.d
$.d=z+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"powerCapacity","Energy capacity of generator blocks.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.O(y,new S.pP())
this.a4()
y=$.d
$.d=y+1
z=new S.v(1e4,1/0,-1/0,0,null,null,null,null,null,"thrusterForce","Force exerted by thruster blocks. Does not automatically scale with block size.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.pQ())
z=$.d
$.d=z+1
y=new S.v(2,1/0,-1/0,0,null,null,null,null,null,"thrusterBoost","Thruster boost multiplier. Thrust is multiplied by this number for thrusterBoostTime seconds.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.O(y,new S.pR())
y=$.d
$.d=y+1
z=new S.v(0.2,1/0,-1/0,0,null,null,null,null,null,"thrusterBoostTime","Thruster boost time. Thrust is multiplied by thrusterBoost for this number of seconds.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.pS())
z=$.d
$.d=z+1
y=new S.an(127,127,127,255,!0,null,null,null,null,null,null,null,null,"thrusterColor","Primary thruster colour. Main trail is this colour.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.O(y,new S.pT())
y=$.d
$.d=y+1
z=new S.an(127,127,127,255,!0,null,null,null,null,null,null,null,null,"thrusterColor1","Secondary thruster colour. Flame immediately at the thruster is this colour. If left unspecified, defaults to thrusterColor.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.O(z,new S.pV())
this.a4()
z=$.d
$.d=z+1
y=new S.v(1e4,1/0,-1/0,0,null,null,null,null,null,"torquerTorque","Angular force applied by torquer blocks. Needs to be quite high to have any noticeable effect unless the ship is exceptionally light.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.O(y,new S.pW())
y=$.d
$.d=y+1
z=new S.v(4,1/0,-1/0,0,null,null,null,null,null,"teleporterPower","Energy per mass (calculated against total mass) required for teleport blocks to teleport a ship.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.O(z,new S.pX())
this.a4()
z=S.co("cannon","Cannon properties. Reliant upon the CANNON feature.",S.qk())
z.aZ()
this.O(z,new S.pY())
z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.ql(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
y=$.d
$.d=y+1
x=new S.cn(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"damage","Projectile damage.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
z.q(x)
x=$.d
$.d=x+1
y=new S.cn(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"explodeRadius","Explosion radius. Only valid if 'explosive' is set.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
z.q(y)
y=$.d
$.d=y+1
x=new S.cn(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"muzzleVel","Projectile velocity.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
z.q(x)
x=$.d
$.d=x+1
y=new S.cn(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"power","Energy consumption per shot.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
z.q(y)
y=$.d
$.d=y+1
x=new S.cn(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"range","Projectile range.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
z.q(x)
x=$.d
$.d=x+1
y=new S.cn(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"roundsPerSec","Rounds fired per second.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
z.q(y)
z=S.co("cannonBoost","Cannon booster properties. Reliant upon the CANNON_BOOST feature. Additions are applied together before multipliers.",z)
z.aZ()
this.O(z,new S.pZ())
z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.qs(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
y=$.d
$.d=y+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"damage","Damage per second.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
x=$.d
$.d=x+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"power","Power consumed per second.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
z.q(y)
y=$.d
$.d=y+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"range","Length of beam.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
x=$.d
$.d=x+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"width","Beam width. Units not specified by game docs.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
z.q(y)
z.a4()
y=$.d
$.d=y+1
x=new S.an(127,127,127,255,!0,null,null,null,null,null,null,null,null,"color","Beam colour.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
z.q(x)
z.a4()
x=$.d
$.d=x+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"linearForce","Directional force applied to targets along the direction of the beam. Positive pushes targets away, negative draws them closer.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
z.q(y)
y=$.d
$.d=y+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"immobilizeForce","Immobilisation force applied to targets, keeping them in the same relative position as when hit. Higher values must be countered with more thrust to escape.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
x.cy=0
z.q(x)
z.a4()
x=$.d
$.d=x+1
y=new S.v(0.35,1/0,-1/0,0,null,null,null,null,null,"decay","Fraction of time between shots that it takes for the laser to fade away.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
z.q(y)
y=$.d
$.d=y+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"pulsesPerSec","",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
x=$.d
$.d=x+1
y=new S.bt(0,2147483647,-2147483647,0,null,null,null,null,null,"pulsesPerBurst","",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
y.ch=1
y.db=1
z.q(y)
y=$.d
$.d=y+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"pulseAvailability","",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
x=$.d
$.d=x+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"burstyness","",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,y)
y.db=y.ch
z.q(y)
z.a4()
z.q(S.bl("explosive","Explosive behaviour of the beam. For no explosion, leave this unchecked.",$.$get$cP(),!0))
y=$.d
$.d=y+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"explodeRadius","Explosion radius at the beam contact point when explosions are enabled in the cannon section.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,x)
x.db=x.ch
z.q(x)
z=S.co("laser","Laser properties. Reliant upon the LASER feature.",z)
z.aZ()
this.O(z,new S.q_())
z=$.d
$.d=z+1
x=new S.v(6,1/0,-1/0,0,new S.q0(),null,null,null,null,"turretSpeed","Turret rotational speed in radians per second. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,x)
x.db=x.ch
this.O(x,new S.q1())
x=$.d
$.d=x+1
z=new S.v(1,1/0,-1/0,0,null,null,null,null,null,"chargeMaxTime","Time in seconds for charger weapons to achieve maximum charge.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
z.db=z.ch
this.O(z,new S.q2())
z=$.d
$.d=z+1
x=new S.v(0.1,1/0,-1/0,0,null,null,null,null,null,"chargeMin","Fraction of charge at which a charging weapon may fire.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,x)
x.db=x.ch
this.O(x,new S.q3())
this.a4()
x=$.d
$.d=x+1
z=new S.v(51,1/0,-1/0,0,null,null,null,null,null,"explodeDamage","Damage caused by blocks with the explode feature.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
z.db=z.ch
this.O(z,new S.q5())
z=$.d
$.d=z+1
x=new S.v(30,1/0,-1/0,0,null,null,null,null,null,"explodeRadius","Blast radius for blocks with the explode feature.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,x)
x.db=x.ch
this.O(x,new S.q6())
this.a4()
x=$.d
$.d=x+1
z=new S.iG(!1,null,0,0,null,null,null,null,null,null,null,"replicateBlock","Spawned block properties. Reliant upon the LAUNCHER feature.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
z.cZ("replicateBlock","Spawned block properties. Reliant upon the LAUNCHER feature.",null)
z.aZ()
this.O(z,new S.q7())
z=$.d
$.d=z+1
x=new S.v(1,1/0,-1/0,0,new S.q8(),null,null,null,null,"replicateTime","Time required to build the launched block.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,x)
x.db=x.ch
this.O(x,new S.q9())
x=$.d
$.d=x+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"launcherPower","Power required to build a single launched block.",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
z.db=z.ch
this.O(z,new S.qa())
z=$.d
$.d=z+1
x=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"launcherOutSpeed","",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,x)
x.db=x.ch
this.O(x,new S.qb())
x=$.d
$.d=x+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"launcherAngVel","",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
z.db=z.ch
this.O(z,new S.qc())},
C:{
bL:function(a){var z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.pG(0,0,!1,z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
z.hg(a)
return z}}},
pH:{"^":"a:4;",
$1:function(a){var z,y
z=$.$get$cQ()
y=$.$get$bF()
return S.wH(a.f,"features",[z,y],!1)}},
pI:{"^":"a:33;",
$1:[function(a){var z=J.ha(a)
return"Auto P cost: "+H.e(z.gj7()?z.gii():"?")},null,null,2,0,null,2,"call"]},
pJ:{"^":"a:11;",
$1:[function(a){var z,y,x,w,v
z=J.f(a)
y=J.a8(z.gaA(a),"shape")
x=P.a0(y.gai(),J.a8(z.gaA(a),"scale"))
z=z.gG(a)
w=J.cE(y)
v=x-1
if(v>>>0!==v||v>=w.length)return H.b(w,v)
return"Block health: "+J.eq(J.u(J.u(z,w[v]),100),0)},null,null,2,0,null,2,"call"]},
pU:{"^":"a:11;",
$1:[function(a){var z,y,x,w,v
z=J.f(a)
y=J.a8(z.gaA(a),"shape")
x=P.a0(y.gai(),J.a8(z.gaA(a),"scale"))
z=z.gG(a)
w=J.cE(y)
v=x-1
if(v>>>0!==v||v>=w.length)return H.b(w,v)
return"Block mass: "+J.eq(J.u(J.u(z,w[v]),100),2)},null,null,2,0,null,2,"call"]},
q4:{"^":"a:11;",
$1:[function(a){var z,y,x,w,v
z=J.f(a)
y=J.a8(z.gaA(a),"shape")
x=P.a0(y.gai(),J.a8(z.gaA(a),"scale"))
z=z.gG(a)
if(typeof z!=="number")return H.C(z)
w=J.cE(y)
v=x-1
if(v>>>0!==v||v>=w.length)return H.b(w,v)
return"Growth time: "+C.d.ce(10/z*Math.sqrt(H.P(w[v])),1)+"sec"},null,null,2,0,null,2,"call"]},
qd:{"^":"a:4;",
$1:function(a){var z=$.$get$dz()
return S.D(a.f,"features",z)}},
qe:{"^":"a:4;",
$1:function(a){var z=$.$get$ci()
if(!S.D(a.f,"features",z)){z=$.$get$cl()
if(!S.D(a.f,"features",z)){z=$.$get$aV()
z=S.D(a.f,"features",z)}else z=!0}else z=!0
return z}},
qf:{"^":"a:4;",
$1:function(a){var z=$.$get$bF()
return S.D(a.f,"features",z)}},
qg:{"^":"a:4;",
$1:function(a){var z=$.$get$bF()
return S.D(a.f,"features",z)}},
qh:{"^":"a:4;",
$1:function(a){var z=$.$get$bF()
return S.D(a.f,"features",z)}},
qi:{"^":"a:4;",
$1:function(a){var z=$.$get$bF()
return S.D(a.f,"features",z)}},
pK:{"^":"a:4;",
$1:function(a){var z=$.$get$bF()
return S.D(a.f,"features",z)}},
pL:{"^":"a:4;",
$1:function(a){var z=$.$get$cT()
return S.D(a.f,"features",z)}},
pM:{"^":"a:4;",
$1:function(a){var z=$.$get$cU()
return S.D(a.f,"features",z)}},
pN:{"^":"a:4;",
$1:function(a){var z=$.$get$cS()
return S.D(a.f,"features",z)}},
pO:{"^":"a:4;",
$1:function(a){var z=$.$get$ck()
return S.D(a.f,"features",z)}},
pP:{"^":"a:4;",
$1:function(a){var z=$.$get$ck()
return S.D(a.f,"features",z)}},
pQ:{"^":"a:4;",
$1:function(a){var z=$.$get$bG()
return S.D(a.f,"features",z)}},
pR:{"^":"a:4;",
$1:function(a){var z=$.$get$bG()
return S.D(a.f,"features",z)}},
pS:{"^":"a:4;",
$1:function(a){var z=$.$get$bG()
return S.D(a.f,"features",z)}},
pT:{"^":"a:4;",
$1:function(a){var z=$.$get$bG()
return S.D(a.f,"features",z)}},
pV:{"^":"a:4;",
$1:function(a){var z=$.$get$bG()
return S.D(a.f,"features",z)}},
pW:{"^":"a:4;",
$1:function(a){var z=$.$get$eH()
return S.D(a.f,"features",z)}},
pX:{"^":"a:4;",
$1:function(a){var z=$.$get$eG()
return S.D(a.f,"features",z)}},
pY:{"^":"a:4;",
$1:function(a){var z=$.$get$ci()
return S.D(a.f,"features",z)}},
pZ:{"^":"a:4;",
$1:function(a){var z=$.$get$dx()
return S.D(a.f,"features",z)}},
q_:{"^":"a:4;",
$1:function(a){var z=$.$get$cl()
return S.D(a.f,"features",z)}},
q0:{"^":"a:11;",
$1:[function(a){return S.wF(a)+"/sec"},null,null,2,0,null,2,"call"]},
q1:{"^":"a:4;",
$1:function(a){var z=$.$get$cm()
return S.D(a.f,"features",z)}},
q2:{"^":"a:4;",
$1:function(a){var z=$.$get$cj()
return S.D(a.f,"features",z)}},
q3:{"^":"a:4;",
$1:function(a){var z=$.$get$cj()
return S.D(a.f,"features",z)}},
q5:{"^":"a:4;",
$1:function(a){var z=$.$get$cR()
return S.D(a.f,"features",z)}},
q6:{"^":"a:4;",
$1:function(a){var z=$.$get$cR()
return S.D(a.f,"features",z)}},
q7:{"^":"a:4;",
$1:function(a){var z=$.$get$aV()
return S.D(a.f,"features",z)}},
q8:{"^":"a:11;",
$1:[function(a){var z=J.cF(a)
if(typeof z!=="number")return H.C(z)
return C.d.ce(1/z,1)+"/sec"},null,null,2,0,null,2,"call"]},
q9:{"^":"a:4;",
$1:function(a){var z=$.$get$aV()
return S.D(a.f,"features",z)}},
qa:{"^":"a:4;",
$1:function(a){var z=$.$get$aV()
return S.D(a.f,"features",z)}},
qb:{"^":"a:4;",
$1:function(a){var z=$.$get$aV()
return S.D(a.f,"features",z)}},
qc:{"^":"a:4;",
$1:function(a){var z=$.$get$aV()
return S.D(a.f,"features",z)}},
qj:{"^":"bu;a,b,c,d,e,f,r,x,y",
hh:function(){var z,y
z=$.d
$.d=z+1
y=new S.v(0,1/0,-1/0,0,new S.qm(),null,null,null,null,"damage","Damage per round.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"power","Power consumed per shot fired.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)
z=$.d
$.d=z+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"roundsPerSec","Shots fired per second.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"muzzleVel","Velocity of fired rounds.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)
z=$.d
$.d=z+1
y=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"range","Weapon range. Rounds are destroyed when reaching this distance.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,S.ro(),null,null,null,null,"spread","Maximum random deviation from weapon facing, measured in radians. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)
this.a4()
z=$.d
$.d=z+1
y=new S.bt(0,2147483647,-2147483647,0,null,null,null,null,null,"roundsPerBurst","Number of rounds in each burst when burstyness is greater than zero.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
y.ch=1
y.db=1
this.q(y)
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"burstyness","Measures how tight burst fire is. Example: 3 rounds per burst, 1 round per second - 0.0 = one round every second. 0.5 = three rounds spaced half of a second apart, followed by a 1.5 second pause. 1.0 = all three shots at once, followed by a 3 second pause.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)
this.a4()
z=$.d
$.d=z+1
y=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color","Colour of rounds.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
this.a4()
this.q(S.bl("explosive","Explosive behaviour of fired projectiles. For no explosion, leave this unchecked.",$.$get$cP(),!0))
y=$.d
$.d=y+1
z=new S.v(0,1/0,-1/0,0,null,null,null,null,null,"explodeRadius","Explode radius of the round when explosions are enabled.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)},
C:{
qk:function(){var z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.qj(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
z.hh()
return z}}},
qm:{"^":"a:11;",
$1:[function(a){var z,y
z=J.f(a)
y=J.a8(z.gaA(a),"roundsPerSec")
return"DPS: "+H.e(J.bA(J.u(J.u(z.gG(a),y),10))/10)},null,null,2,0,null,2,"call"]},
qs:{"^":"bu;a,b,c,d,e,f,r,x,y"},
qn:{"^":"bu;a,b,c,d,e,f,r,x,y"},
ql:{"^":"bu;a,b,c,d,e,f,r,x,y"},
qu:{"^":"bu;a,b,c,d,e,f,r,x,y"},
qo:{"^":"bu;a,b,c,d,e,f,r,x,y",
J:function(){var z=S.eZ()
this.cw(z)
z.K(z.x)
return z},
bN:function(a,b,c,d){var z,y,x,w
z=this.a
y=H.e(J.bh(z.h(0,"ident")))+" = {"
S.ai(b,y,d?c:0,!0)
for(z=z.ga_(z),z=z.gA(z),y=c+1;z.l();){x=z.gp()
w=J.f(x)
if(J.y(w.gB(x),"ident"))continue
if(w.gax(x)===!0&&x.aI()===!0)w.at(x,b,y)}S.ai(b,"},",c,!0)},
aY:function(a,b,c){return this.bN(a,b,c,!0)},
hi:function(){var z,y
z=$.d
$.d=z+1
y=new S.dI(0,2147483647,-2147483647,0,null,null,null,null,null,"ident","Faction id. Used in block 'group' fields and the start of ship file names to associate them with the faction.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
y.ch=0
y.db=0
y.aZ()
this.q(y)
y=$.d
$.d=y+1
z=new S.b6("",null,null,null,"name","Faction name as it will appear in-game.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
this.q(S.bl("playable","Whether the faction is selectable by the player, and if it needs to be unlocked first.",$.$get$eK(),!0))
z=$.d
$.d=z+1
y=new S.b6("",null,null,null,"start","Starter ship blueprint. Filename minus extension (20_test.lua -> 20_test).",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
y=$.d
$.d=y+1
z=new S.bt(0,2147483647,-2147483647,0,null,null,null,null,null,"primaries","Number of faction colours.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
z.ch=2
z.db=2
z.cy=0
z.cx=3
this.q(z)
z=$.d
$.d=z+1
y=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color0","First faction colour",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.O(y,new S.qp())
y=$.d
$.d=y+1
z=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color1","Second faction colour",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.O(z,new S.qq())
z=$.d
$.d=z+1
y=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color2","Third faction colour",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.O(y,new S.qr())
this.q(S.bl("aiflags","Ship behaviour flags. Applied to all ships on the side, added to by any flags set in individual command modules.",$.$get$cO(),!1))},
C:{
eZ:function(){var z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.qo(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
z.hi()
return z}}},
qp:{"^":"a:4;",
$1:function(a){return J.a6(H.q(a.f.a.h(0,"primaries"),"$isbt").ch,0)}},
qq:{"^":"a:4;",
$1:function(a){return J.a6(H.q(a.f.a.h(0,"primaries"),"$isbt").ch,1)}},
qr:{"^":"a:4;",
$1:function(a){return J.a6(H.q(a.f.a.h(0,"primaries"),"$isbt").ch,2)}},
qt:{"^":"bu;a,b,c,d,e,f,r,x,y",
J:function(){var z=S.f_()
this.cw(z)
z.K(z.x)
return z},
hj:function(){var z,y,x,w
z=$.d
$.d=z+1
y=new S.aj(0,2147483647,-2147483647,0,null,null,null,null,null,"ident","Region ID",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
y.aZ()
this.q(y)
y=$.d
$.d=y+1
z=new S.an(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color","Region colour override. Defaults to an average of the controlling faction's colours.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
z=$.d
$.d=z+1
y=new S.aj(0,2147483647,-2147483647,0,null,null,null,null,null,"faction","Controlling faction ID",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
y=$.d
$.d=y+1
z=new S.bt(0,2147483647,-2147483647,0,null,null,null,null,null,"count","Number of regions in the galaxy",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
z.ch=0
z.db=0
this.q(z)
z=$.d
$.d=z+1
y=new S.dH(0.1,1,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"position","Positional range of the centre of the region. 0.0 = centre, 1.0 = edge",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
y=$.d
$.d=y+1
z=new S.dH(0.1,0.15,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"radius","Size range of the region as a fraction of the map radius. 0.1 = 10%",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
this.q(S.bl("type","Shape of this region when added to the map. Default is voronoi regions.",$.$get$eM(),!0))
this.a4()
z=$.d
$.d=z+1
y=new S.iJ([],null,null,null,null,null,"fleets","Fleets which could spawn in the region. Faction ID paired with a P weight at the edge and centre of the region.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
y=$.d
$.d=y+1
z=new S.eO(8,15,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"fleetCount","Number of ships per fleet",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
z=$.d
$.d=z+1
y=new S.v(0.75,1/0,-1/0,0,null,null,null,null,null,"fleetFraction","?",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
y.db=y.ch
this.q(y)
this.a4()
y=$.d
$.d=y+1
z=new S.eQ([],null,null,null,null,null,"fortress","Fortress designs. These ships will appear guarding deactivated stations in the region.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
z=$.d
$.d=z+1
y=new S.eO(3,6,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"fortressCount","Number of fortresses in the region",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
y=$.d
$.d=y+1
z=new S.dH(500,500,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"fortressRadius","Distance from station markers to place fortresses.",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
this.q(z)
this.a4()
z=$.d
$.d=z+1
y=new S.iN([],null,null,null,null,null,"unique","Unique groups of ships which may appear exactly as specified in the region.",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,y)
this.q(y)
y=$.d
$.d=y+1
z=new S.v(0.25,1/0,-1/0,0,null,null,null,null,null,"uniqueFraction","?",null,null,!1,!1,!1,y)
$.$get$m().i(0,y,z)
z.db=z.ch
this.q(z)
this.a4()
z=$.$get$eI()
y=H.l(new H.a2(0,null,null,null,null,null,0),[S.ap,P.bc])
x=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.ap])
w=$.d
$.d=w+1
x=new S.iH(!1,y,x,null,null,null,null,null,"ambient","The type of ambient plants which generate on ENVIRONMENTAL blocks in the region",null,null,!1,!1,!1,w)
$.$get$m().i(0,w,x)
x.cY("ambient","The type of ambient plants which generate on ENVIRONMENTAL blocks in the region",z,!1)
this.q(x)
x=$.d
$.d=x+1
z=new S.dH(0,0.4,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"asteroidDensity","Density of asteroids in the region. 0.0-1.0",null,null,!1,!1,!1,x)
$.$get$m().i(0,x,z)
this.q(z)
z=$.d
$.d=z+1
x=new S.eO(0,0,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"asteroidSize","Size in blocks of asteroids in the region",null,null,!1,!1,!1,z)
$.$get$m().i(0,z,x)
this.q(x)
this.q(S.bl("asteroidFlags","Properties for asteroids in the region. Not specifying any shape types will choose randomly.",$.$get$eB(),!1))},
C:{
f_:function(){var z=H.l(new H.a2(0,null,null,null,null,null,0),[P.t,S.X])
z=new S.qt(z,P.ab(null,null,null,S.X),H.l([],[W.W]),P.as(),null,null,null,!1,null)
z.hj()
return z}}},
qF:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.f(a)
y=z.gB(a).split(".")
if(0>=y.length)return H.b(y,0)
if(J.aT(y[0],"block")!==!0){S.bw("Warning!",'Selected file ("'+H.e(z.gB(a))+"\") is probably not a blocks file! Make sure the file name contains the word 'block' if you are sure it is a blocks file.")
return}if(b!=null)S.qG(b)}},
qT:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.f(a)
y=z.gB(a).split(".")
if(0>=y.length)return H.b(y,0)
if(J.aT(y[0],"shapes")!==!0){S.bw("Warning!",'Selected file ("'+H.e(z.gB(a))+"\") is probably not a shapes file! Make sure the file name contains the word 'shapes' if you are sure it is a blocks file.")
return}if(b!=null)S.qU(b)}},
qJ:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.f(a)
y=z.gB(a).split(".")
if(0>=y.length)return H.b(y,0)
if(J.aT(y[0],"faction")!==!0){S.bw("Warning!",'Selected file ("'+H.e(z.gB(a))+"\") is probably not a factions file! Make sure the file name contains the word 'faction' if you are sure it is a factions file.")
return}if(b!=null)S.qK(b)}},
qO:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.f(a)
y=z.gB(a).split(".")
if(0>=y.length)return H.b(y,0)
if(J.aT(y[0],"region")!==!0){S.bw("Warning!",'Selected file ("'+H.e(z.gB(a))+"\") is probably not a regions file! Make sure the file name contains the word 'region' if you are sure it is a blocks file.")
return}if(b!=null)S.qQ(b)}},
qP:{"^":"a:8;",
$1:function(a){return"{"+H.e(a)+"}"}},
qX:{"^":"a:12;",
$2:function(a,b){var z=J.f(a)
if(!J.dp(z.gB(a),$.$get$jt())){S.bw("Warning!",'Selected file ("'+H.e(z.gB(a))+"\") is probably not a ship file! Make sure the file name starts with a number followed by '_' (e.g. 2_awesomefighter.lua) if you are sure it is a ship file.")
return}if(b!=null)S.qY(a,b)}},
qM:{"^":"a:39;a,b,c,d",
$1:[function(a){var z,y,x
z=J.ek(J.a9(a))
y=this.c
if(y!=null)z=y.$1(z)
x=S.r2(z,this.d)
y=this.b
if(y!=null)y.$2(this.a,x)},null,null,2,0,null,36,"call"]},
r5:{"^":"a:7;",
$1:function(a){return""}},
r6:{"^":"a:7;",
$1:function(a){return"\\\\"}},
r7:{"^":"a:7;",
$1:function(a){return'="'+H.e(a.a0(1))+'"'}},
rb:{"^":"a:7;a",
$1:function(a){var z,y,x,w,v,u,t
z='"'+this.a.a+++'":{"blockid":"'+H.e(a.a0(1))+'", "pos":{"0":'
z=z+H.e(a.a0(3)==null?0:a.a0(3))+',"1":'
y=z+H.e(a.a0(4)==null?0:a.a0(4))+"}"
if(a.gcM()>=7)for(x=6;x<a.gcM();++x){w=a.a0(x)
if(w!=null){v=J.hh(w,",")
for(z=v.length,u=0;u<v.length;v.length===z||(0,H.x)(v),++u){t=J.cG(v[u])
y=H.af(t,new S.r4())!=null?y+(', "rotation":'+t):y+(", "+t)}}}return y+"}"}},
r4:{"^":"a:2;",
$1:function(a){return}},
rc:{"^":"a:7;",
$1:function(a){return H.e(a.a0(1))+","+H.e(a.a0(2))}},
rd:{"^":"a:7;",
$1:function(a){return'"'+H.e(a.a0(1))+'":'+H.e(a.a0(2))}},
re:{"^":"a:7;",
$1:function(a){return'"'+H.e(a.a0(1))+'":"'+H.e(a.a0(2))+'",'}},
rf:{"^":"a:7;",
$1:function(a){var z,y
z={}
y=a.a0(0)
z.a=0
return J.mm(y,$.$get$jl(),new S.r3(z))}},
r3:{"^":"a:7;a",
$1:function(a){var z=a.a0(0)
C.f.cF("[\\w_]+",z)
return'"'+this.a.a+++'":"'+H.e(z)+'"'}},
rg:{"^":"a:7;",
$1:function(a){if(J.y(a.a0(1),":"))return H.e(a.a0(1))+' { "ident":'+H.e(a.a0(2))+","
return H.e(a.a0(1))+' "'+H.e(a.a0(2))+'":{ "ident":"'+H.e(a.a0(2))+'",'}},
rh:{"^":"a:7;a",
$1:function(a){return H.e(a.a0(1))+' "'+this.a.b+++'":'}},
ri:{"^":"a:7;",
$1:function(a){return"}"}},
r8:{"^":"a:7;",
$1:function(a){return H.e(a.a0(1))+","}},
r9:{"^":"a:7;",
$1:function(a){return H.e(a.a0(1))+", "+H.e(a.a0(2))}},
ra:{"^":"a:7;",
$1:function(a){return"}"}},
qH:{"^":"a:10;",
$2:[function(a,b){var z,y
if(!!J.r(b).$isB){z=S.bL(!1)
z.aa(0,b)
y=S.ex(z)
$.aH.F(0,y)}},null,null,4,0,null,4,1,"call"]},
qV:{"^":"a:10;",
$2:[function(a,b){var z
if(!!J.r(b).$isB){z=S.n8(b)
$.bx.F(0,z)}},null,null,4,0,null,4,1,"call"]},
qL:{"^":"a:10;",
$2:[function(a,b){var z,y,x
z=J.r(b)
if(!!z.$isB){z.i(b,"ident",a)
y=S.eZ()
y.aa(0,b)
x=S.eN(y)
$.by.F(0,x)}},null,null,4,0,null,4,1,"call"]},
qR:{"^":"a:10;",
$2:[function(a,b){var z,y
if(!!J.r(b).$isB){z=S.f_()
z.aa(0,b)
y=S.fe(z)
$.be.F(0,y)}},null,null,4,0,null,4,1,"call"]},
qZ:{"^":"a:2;",
$1:function(a){return-1}},
r_:{"^":"a:2;",
$1:function(a){return 0}},
r0:{"^":"a:2;",
$1:function(a){return 0}},
r1:{"^":"a:2;",
$1:function(a){return 0}},
z2:{"^":"k;"},
f8:{"^":"k;a,b,c,d,e,f,r,x",
bT:function(a,b,c){var z=this.a++
this.b.i(0,z,b)
b.scH(this)
J.h0(b)
this.e.appendChild(b.gaT())
b.sc8(z)
z=this.c
if(c===-1)z.push(b)
else{C.e.bF(z,"insert")
if(c<0||c>z.length)H.F(P.c4(c,null,null))
z.splice(c,0,b)
this.dS()}if(this.r!=null)this.e_(this)},
F:function(a,b){return this.bT(a,b,-1)},
cv:function(a){var z,y
z=a.J()
y=C.e.bI(this.c,a)
this.bT(0,z,y+1)
z.a1(0)},
cl:function(a){var z,y,x,w,v
z=this.c
y=C.e.bI(z,a)
if(y<=0)return
x=y-1
w=z.length
if(x>=w)return H.b(z,x)
v=z[x]
z[x]=a
if(y>=w)return H.b(z,y)
z[y]=v
this.dS()},
cm:function(a){var z,y,x,w,v
z=this.c
y=C.e.bI(z,a)
if(y===-1||y>=z.length-1)return
x=y+1
w=z.length
if(x<0||x>=w)return H.b(z,x)
v=z[x]
z[x]=a
if(y<0||y>=w)return H.b(z,y)
z[y]=v
this.dS()},
ck:function(a,b){var z
if(!J.y(this.d,b)){for(z=this.b,z=z.ga_(z),z=z.gA(z);z.l();)z.gp().cz()
b.cj(0)
this.d=b}},
aF:function(a){var z,y
for(z=this.c,y=z.length-1;y>=0;--y){if(y>=z.length)return H.b(z,y)
this.bZ(z[y])}},
bZ:function(a){this.b.ad(0,a.gc8())
C.e.ad(this.c,a)
if(J.y(this.d,a))this.d=null
a.aK()
if(this.r!=null)this.e_(this)},
dS:function(){var z,y,x,w,v,u
z=H.l([],[W.J])
for(y=this.e.childNodes,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){v=y[w]
if(v.nodeType===1)z.push(v)}J.aq(this.e,"")
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){u=y[w]
this.e.appendChild(u.gaT())}},
a1:function(a){if(this.r!=null)this.e_(this)},
dY:function(){var z,y,x
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x)J.er(z[x])},
hk:function(a,b){var z="#"+a
this.e=document.querySelector(z)
z="#"+b
this.f=document.querySelector(z)},
e_:function(a){return this.r.$1(a)},
C:{
dQ:function(a,b){var z=new S.f8(0,P.as(),[],null,null,null,null,null)
z.hk(a,b)
return z}}},
rs:{"^":"k;W:a<,aT:b<,cH:c?,d,e,f,r,x,y,c8:z@,jy:Q<",
J:function(){var z,y
z=S.fe(null)
y=this.a.J()
z.a=y
y.r=z
return z},
aK:function(){var z,y,x,w
this.a.aD()
J.aL(this.b)
this.b=null
z=$.cb
y=$.be.d
x=z.c
w=z.a
J.aS(x,0,0,w,w)
z.bx(0,5,16)
z.c_(y)},
cj:function(a){var z,y,x,w
this.y=!0
z=this.a.ay(0)
y=this.a
y.K(y.x)
this.c.f.appendChild(z)
this.b.className="ui regionbox selected"
y=$.cb
x=y.c
w=y.a
J.aS(x,0,0,w,w)
y.bx(0,5,16)
y.c_(this)},
cz:function(){this.y=!1
this.a.aD()
this.b.className="ui regionbox"},
dv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=document
y=z.createElement("div")
y.className="ui regionbox"
J.a7(y,"click",new S.rt(this),null)
this.b=y
z=document
x=z.createElement("span")
x.className="regionname"
y.appendChild(x)
z=document
w=z.createElement("span")
this.d=w
w.textContent="0"
w.className="regionid"
x.appendChild(w)
z=document
v=z.createElement("span")
this.e=v
v.textContent="info"
v.className="regioninfo"
x.appendChild(v)
z=document
u=z.createElement("span")
this.x=u
u.textContent="Faction"
u.className="regionfaction"
y.appendChild(u)
z=document
t=z.createElement("div")
t.className="regioncolour"
y.appendChild(t)
this.r=t
z=document
s=z.createElement("div")
s.className="ui regionsortbutton"
z=J.f(s)
z.sa9(s,'<i class="glyphicon glyphicon-menu-up"></i>')
s.title="Move this region up"
z.L(s,"click",new S.ru(this),null)
y.appendChild(s)
z=document
r=z.createElement("div")
r.className="ui regionsortbutton sortdown"
z=J.f(r)
z.sa9(r,'<i class="glyphicon glyphicon-menu-down"></i>')
r.title="Move this region down"
z.L(r,"click",new S.rv(this),null)
y.appendChild(r)
z=document
q=z.createElement("div")
q.className="ui regioncopybutton"
z=J.f(q)
z.sa9(q,'<i class="glyphicon glyphicon-duplicate"></i>')
q.title="Duplicate this faction."
z.L(q,"click",new S.rw(this),null)
y.appendChild(q)
z=document
p=z.createElement("div")
p.className="ui regiondeletebutton"
z=J.f(p)
z.sa9(p,'<i class="glyphicon glyphicon-trash"></i>')
p.title="Delete this faction"
z.L(p,"click",new S.rx(this),null)
y.appendChild(p)
z=document
o=z.createElement("div")
o.className="regiondeletescreen"
z=J.f(o)
z.sa9(o,"Delete this region? ")
z.L(o,"click",new S.ry(),null)
this.f=o
y.appendChild(o)
z=document
n=z.createElement("div")
n.className="regiondeletescreenbutton deleteyes glyphicon glyphicon-ok"
n.title="Delete the region"
J.a7(n,"click",new S.rz(this),null)
o.appendChild(n)
z=document
m=z.createElement("div")
m.className="regiondeletescreenbutton deleteno glyphicon glyphicon-remove"
m.title="Keep the regtion"
J.a7(m,"click",new S.rA(this),null)
o.appendChild(m)
z=this.a
z.K(z.x)},
ay:function(a){return this.dv(a,-1)},
dX:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a.E(0,"ident")
y=J.c0(this.a.a.h(0,"faction"))
x=this.a.E(0,"faction")
w=this.a.E(0,"count")
v=this.a.E(0,"position")
u=this.a.E(0,"radius")
t=this.a.E(0,"fleets")
if(y!==!0&&J.a6(J.al(t),0)){for(s=J.a5(t),r=-1,q=0;s.l();){p=s.gp()
o=J.N(p)
n=J.G(o.h(p,"0"),o.h(p,"1"))
if(J.a6(n,q)){r=o.h(p,"faction")
q=n}}if(!J.y(r,-1)){x=r
y=!0}}m=this.a.E(0,"color")
if(m==null&&y===!0)for(s=$.by.c,o=s.length,l=0;l<s.length;s.length===o||(0,H.x)(s),++l){p=s[l]
if(J.y(J.a8(p.gW(),"ident"),x)){m=p.ig()
break}}if(m!=null){this.Q=m
s=this.r.style
o=J.N(m)
o="rgb("+H.e(o.h(m,"r"))+","+H.e(o.h(m,"g"))+","+H.e(o.h(m,"b"))+")"
s.backgroundColor=o}else{this.Q=P.ae(["r",127,"g",127,"b",127])
s=this.r.style
s.backgroundColor="#808080"}if(y===!0){s=$.by.c
o=s.length
l=0
while(!0){if(!(l<s.length)){k=!1
break}p=s[l]
if(J.y(J.a8(p.gW(),"ident"),x)){j=J.a8(p.gW(),"name")
if(J.dl(j)!==!0){this.x.textContent=j
k=!0}else k=!1
break}s.length===o||(0,H.x)(s);++l}if(!k)this.x.textContent="F"+H.e(x)}else this.x.textContent=""
s=J.N(v)
i=J.y(s.h(v,"0"),s.h(v,"1"))?S.cC(s.h(v,"0"))+"%":S.cC(s.h(v,"0"))+"-"+S.cC(s.h(v,"1"))+"%"
s=J.N(u)
h=J.y(s.h(u,"0"),s.h(u,"1"))?S.cC(s.h(u,"0"))+"%":S.cC(s.h(u,"0"))+"-"+S.cC(s.h(u,"1"))+"%"
g="x"+H.e(w)+", "+h+" @"+i
this.d.textContent=H.e(z)+" "
this.e.textContent=g
s=$.cb
o=$.be.d
f=s.c
e=s.a
J.aS(f,0,0,e,e)
s.bx(0,5,16)
s.c_(o)},
a1:function(a){var z=this.a
z.K(z.x)},
aY:function(a,b,c){this.a.aY(0,b,c)},
hl:function(a){var z=this.a
if(z==null){z=S.f_()
this.a=z}z.r=this},
C:{
fe:function(a){var z=new S.rs(a,null,null,null,null,null,null,null,!1,null,P.ae(["r",127,"g",127,"b",127]))
z.hl(a)
return z}}},
rt:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.ck(0,y)
z.b_(a)
z.a2(a)
z.c9(a)},null,null,2,0,null,0,"call"]},
ru:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.cl(z)},null,null,2,0,null,0,"call"]},
rv:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.cm(z)},null,null,2,0,null,0,"call"]},
rw:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.cv(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
rx:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.f(a)
if(z.ga7(a)!==0)return
y=this.a.f.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
ry:{"^":"a:0;",
$1:[function(a){var z=J.f(a)
z.a2(a)
z.b_(a)},null,null,2,0,null,0,"call"]},
rz:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.c.bZ(z)},null,null,2,0,null,0,"call"]},
rA:{"^":"a:0;a",
$1:[function(a){var z=this.a.f.style
z.display="none"},null,null,2,0,null,0,"call"]},
b4:{"^":"k;B:a>,ai:b<,dQ:c<,bw:d<,dD:e<,ij:f<,jq:r<,dn:x>,fa:y<,z,h6:Q<",
w:function(a){var z
for(z=1;z<=this.b;++z)a.$2(this,z)},
al:function(a,b,c,d,e,f){var z,y,x,w
z=this.e
y=a-1
if(y<0||y>=z.length)return H.b(z,y)
z=z[y]
x=S.iT(b,c,d,e,f)
w=this.e
if(y>=w.length)return H.b(w,y)
x.e=w[y].length
z.push(x)},
bD:function(a,b,c,d){return this.al(a,b,c,d,1,0)},
u:["fV",function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
for(z=0;z<this.b;++z){y=this.r
if(z>=20)return H.b(y,z)
if(y[z]==null){x=new S.n(null,null)
x.a=C.c.j(0)
x.b=C.c.j(0)
y[z]=x}y=this.Q
if(y[z]==null)y[z]=z+1
w=H.l(new H.a2(0,null,null,null,null,null,0),[S.aY,P.E])
v=P.ab(null,null,null,S.aY)
y=this.e
if(z>=y.length)return H.b(y,z)
y=y[z]
x=y.length
u=0
for(;u<y.length;y.length===x||(0,H.x)(y),++u){t=J.dm(y[u])
v.F(0,t)
t.gfb()
if(!w.H(0,t))w.i(0,t,0)
w.i(0,t,J.G(w.h(0,t),1))}this.y[z]=w
this.z[z]=v
s=new S.n(null,null)
s.a=C.c.j(0)
s.b=C.c.j(0)
r=0
q=1
while(!0){y=this.d
if(z>=y.length)return H.b(y,z)
y=J.al(y[z])
if(typeof y!=="number")return H.C(y)
if(!(q<=y))break
y=this.d
if(z>=y.length)return H.b(y,z)
p=J.ad(y[z],q-1)
y=this.d
if(z>=y.length)return H.b(y,z)
y=y[z]
x=J.N(y)
o=x.gk(y)
if(typeof o!=="number")return H.C(o)
n=x.h(y,C.c.bM(q,o))
o=J.f(p)
y=J.f(n)
m=J.T(J.u(o.gn(p),y.gm(n)),J.u(o.gm(p),y.gn(n)))
s.a=J.G(s.a,J.u(J.G(o.gn(p),y.gn(n)),m))
s.b=J.G(s.b,J.u(J.G(o.gm(p),y.gm(n)),m))
if(typeof m!=="number")return H.C(m)
r+=m;++q}r*=0.5
y=6*r
s.a=J.bf(s.a,y)
s.b=J.bf(s.b,y)
this.x[z]=Math.abs(r)
this.f[z]=s}this.ju()}],
ju:function(){var z,y,x,w,v,u,t,s
for(z=0;z<this.b;++z){y=this.r
if(z>=20)return H.b(y,z)
x=y[z]
y=this.d
if(z>=y.length)return H.b(y,z)
y=J.a5(y[z])
for(;y.l();){w=y.gp()
v=J.f(w)
v.sn(w,J.T(v.gn(w),x.a))
v.sm(w,J.T(v.gm(w),x.b))}y=this.e
if(z>=y.length)return H.b(y,z)
y=y[z]
v=y.length
u=0
for(;u<y.length;y.length===v||(0,H.x)(y),++u){t=y[u]
s=J.f(t)
s.sn(t,J.T(s.gn(t),x.a))
s.sm(t,J.T(s.gm(t),x.b))}y=this.f[z]
y.a=J.T(y.a,x.a)
y=this.f[z]
y.b=J.T(y.b,x.b)
x.a=0
x.b=0}},
fs:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new S.dU(null,null)
z.a=Math.sin(H.P(b))
z.b=Math.cos(H.P(b))
for(y=c!=null,x=0;x<this.b;++x){if(y&&!C.e.M(c,x))continue
if(x>=20)return H.b(this.f,x)
w=this.d
if(x>=w.length)return H.b(w,x)
w=J.a5(w[x])
for(;w.l();){v=w.gp()
u=J.f(v)
t=u.gn(v)
s=u.gm(v)
r=J.T(J.u(t,z.b),J.u(s,z.a))
s=u.gn(v)
t=u.gm(v)
q=J.G(J.u(s,z.a),J.u(t,z.b))
u.sn(v,r)
u.sm(v,q)}w=this.e
if(x>=w.length)return H.b(w,x)
w=w[x]
u=w.length
p=0
for(;p<w.length;w.length===u||(0,H.x)(w),++p){o=w[p]
t=J.f(o)
s=t.gn(o)
n=t.gm(o)
r=J.T(J.u(s,z.b),J.u(n,z.a))
n=t.gn(o)
s=t.gm(o)
q=J.G(J.u(n,z.a),J.u(s,z.b))
t.sn(o,r)
t.sm(o,q)
t=o.gaw().a
s=o.gaw().b
r=J.T(J.u(t,z.b),J.u(s,z.a))
s=o.gaw().a
t=o.gaw().b
q=J.G(J.u(s,z.a),J.u(t,z.b))
o.gaw().a=r
o.gaw().b=q}m=this.r[x]
w=m.a
u=m.b
r=J.T(J.u(w,z.b),J.u(u,z.a))
u=m.a
w=m.b
q=J.G(J.u(u,z.a),J.u(w,z.b))
m.a=r
m.b=q}},
b6:function(a,b){return this.fs(a,b,null)},
cW:function(a,b,c){var z,y,x
z=P.a0(20,this.b)
this.b=z
this.b=P.a0(20,z)
z=new Array(20)
z.fixed$length=Array
this.d=H.l(z,[[P.i,S.n]])
z=new Array(20)
z.fixed$length=Array
this.e=H.l(z,[[P.i,S.aX]])
this.f=H.l(new Array(20),[S.n])
this.r=H.l(new Array(20),[S.n])
this.x=H.l(new Array(20),[P.aC])
this.y=H.l(new Array(20),[[P.B,S.aY,P.E]])
this.z=H.l(new Array(20),[[P.rL,S.aY]])
this.Q=H.l(new Array(20),[P.aC])
for(y=0;y<this.b;++y){z=this.d
x=H.l([],[S.n])
if(y>=z.length)return H.b(z,y)
z[y]=x
x=this.e
z=H.l([],[S.aX])
if(y>=x.length)return H.b(x,y)
x[y]=z}},
C:{
w:function(a,b,c){var z=new S.b4(a,b,c,null,null,null,null,null,null,null,null)
z.cW(a,b,c)
return z}}},
n:{"^":"k;n:a*,m:b*",
J:function(){var z,y,x
z=this.a
y=this.b
x=new S.n(null,null)
x.a=J.ay(z)
x.b=J.ay(y)
return x}},
aX:{"^":"n;D:c*,aw:d<,a6:e>,a,b",
J:function(){var z,y,x,w
z=this.c
y=this.a
x=this.b
w=this.d
return S.iT(z,y,x,w.a,w.b)},
he:function(a,b,c,d,e){var z,y,x,w
z=J.a_(d)
y=J.a_(e)
x=Math.sqrt(H.P(J.G(z.Y(d,d),y.Y(e,e))))
z=z.aM(d,x)
y=y.aM(e,x)
w=new S.n(null,null)
w.a=C.a.j(z)
w.b=C.a.j(y)
this.d=w},
C:{
iT:function(a,b,c,d,e){var z=new S.aX(a,null,0,null,null)
z.a=J.ay(b)
z.b=J.ay(c)
z.he(a,b,c,d,e)
return z}}},
aY:{"^":"k;cI:a<,il:b<,eV:c<,B:d>,dF:e>,f,fb:r<"},
vr:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,1,1,null,null,null,null,!1,!0)}},
vt:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,4,!1,!1,C.b)}},
wt:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,8,!0,!1,C.b)}},
ws:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t
z=1/(1+Math.sqrt(H.P(2)))*b
y=0.55*b*0.5
x=a.Q
w=b-1
if(w<0||w>=20)return H.b(x,w)
x[w]=y*2
x=-y
v=-z
u=a.d
if(w>=u.length)return H.b(u,w)
u=u[w]
t=new S.n(null,null)
t.a=C.d.j(x)
t.b=C.d.j(v)
J.p(u,t)
t=a.d
if(w>=t.length)return H.b(t,w)
t=t[w]
u=new S.n(null,null)
u.a=C.d.j(x)
u.b=C.d.j(z)
J.p(t,u)
u=a.d
if(w>=u.length)return H.b(u,w)
u=u[w]
t=new S.n(null,null)
t.a=C.d.j(y)
t.b=C.d.j(z*0.5)
J.p(u,t)
t=a.d
if(w>=t.length)return H.b(t,w)
w=t[w]
t=new S.n(null,null)
t.a=C.d.j(y)
t.b=C.d.j(v*0.5)
J.p(w,t)
a.bD(b,C.l,y,0)
a.al(b,C.m,x,0,-1,0)}},
wr:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=b*0.25
y=z*0.5
if(C.c.bM(b,2)===1&&b!==1)z=(b+1)*0.25
x=-b
w=a.r
v=b-1
u=new S.n(null,null)
u.a=C.a.j(x*0.5)
u.b=C.c.j(0)
if(v<0||v>=20)return H.b(w,v)
w[v]=u
a.Q[v]=b*0.5
u=-z
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.c.j(x)
t.b=C.a.j(u)
J.p(w,t)
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
w=new S.n(null,null)
w.a=C.c.j(x)
w.b=C.a.j(z)
J.p(t,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.c.j(0)
t.b=C.a.j(z)
J.p(w,t)
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
w=new S.n(null,null)
w.a=C.c.j(0)
w.b=C.a.j(y)
J.p(t,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.c.j(b)
t.b=C.a.j(y)
J.p(w,t)
t=-y
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
s=new S.n(null,null)
s.a=C.c.j(b)
s.b=C.a.j(t)
J.p(w,s)
s=a.d
if(v>=s.length)return H.b(s,v)
s=s[v]
w=new S.n(null,null)
w.a=C.c.j(0)
w.b=C.a.j(t)
J.p(s,w)
w=a.d
if(v>=w.length)return H.b(w,v)
v=w[v]
w=new S.n(null,null)
w.a=C.c.j(0)
w.b=C.a.j(u)
J.p(v,w)
a.bD(b,C.k,b,0)
S.L(a,b,x,z,x,u,!0,C.b,!1,1)
S.L(a,b,x,u,0,u,!0,C.b,!1,1)
S.L(a,b,0,z,x,z,!0,C.b,!1,1)}},
wq:{"^":"a:1;",
$2:function(a,b){return S.fi(a,b,0.25,44,!1,!0)}},
wp:{"^":"a:9;",
$2:function(a,b){switch(b){case 1:S.aG(a,b,1,1-1/Math.sqrt(H.P(2)),C.b,C.b,C.b,C.b,!0,!1)
break
case 2:S.aG(a,b,1,0.5,C.b,C.b,C.b,C.b,!0,!1)
break
case 3:S.aG(a,b,1,1/Math.sqrt(H.P(2)),C.b,C.b,C.b,C.b,!0,!1)
break
case 4:S.aG(a,b,2,2-2/Math.sqrt(H.P(2)),C.b,C.b,C.b,C.b,!0,!1)
break
case 5:S.aG(a,b,2,2/Math.sqrt(H.P(2)),C.b,C.b,C.b,C.b,!0,!1)
break}}},
wo:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,6,!1,!1,C.b)}},
wn:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,3,!1,!1,C.b)}},
wm:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=b*0.5
y=1/(1+Math.sqrt(H.P(2)))*0.5*b
Math.sqrt(H.P(2))
x=-z
w=a.d
v=b-1
if(v<0||v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.a.j(x)
u.b=C.a.j(x)
J.p(w,u)
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
w=new S.n(null,null)
w.a=C.a.j(x)
w.b=C.a.j(z)
J.p(u,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.d.j(y)
u.b=C.a.j(z)
J.p(w,u)
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
w=new S.n(null,null)
w.a=C.a.j(z)
w.b=C.d.j(y)
J.p(u,w)
w=-y
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
t=new S.n(null,null)
t.a=C.a.j(z)
t.b=C.d.j(w)
J.p(u,t)
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
u=new S.n(null,null)
u.a=C.d.j(y)
u.b=C.a.j(x)
J.p(t,u)
S.L(a,b,x,z,x,x,!0,C.b,!1,1)
S.L(a,b,x,x,z,x,!0,C.b,!1,1)
S.L(a,b,z,x,z,z,!0,C.b,!1,1)
S.L(a,b,z,z,x,z,!0,C.b,!1,1)
s=[]
u=a.e
if(v>=u.length)return H.b(u,v)
u=u[v]
t=u.length
r=0
for(;r<u.length;u.length===t||(0,H.x)(u),++r){q=u[r]
p=J.f(q)
if(J.y(p.gm(q),x)||J.y(p.gm(q),z))if(J.a6(p.gn(q),y))s.push(q)
if(J.y(p.gn(q),z))p=J.a6(p.gm(q),y)||J.bq(p.gm(q),w)
else p=!1
if(p)s.push(q)}for(u=s.length,r=0;r<s.length;s.length===u||(0,H.x)(s),++r){q=s[r]
t=a.e
if(v>=t.length)return H.b(t,v)
t=t[v];(t&&C.e).ad(t,q)}S.L(a,b,y,x,z,w,!0,C.b,!1,1)
S.L(a,b,z,y,y,z,!0,C.b,!1,1)}},
wk:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u
z=b*0.5
y=1/(1+Math.sqrt(H.P(2)))*0.5*b
Math.sqrt(H.P(2))
x=-z
w=a.d
v=b-1
if(v<0||v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.a.j(x)
u.b=C.a.j(x)
J.p(w,u)
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
w=new S.n(null,null)
w.a=C.a.j(x)
w.b=C.a.j(z)
J.p(u,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.d.j(y)
u.b=C.a.j(z)
J.p(w,u)
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
w=new S.n(null,null)
w.a=C.a.j(z)
w.b=C.d.j(y)
J.p(u,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.a.j(z)
u.b=C.d.j(-y)
J.p(w,u)
u=a.d
if(v>=u.length)return H.b(u,v)
v=u[v]
u=new S.n(null,null)
u.a=C.d.j(y)
u.b=C.a.j(x)
J.p(v,u)
a.al(b,C.j,x,0,-1,0)
a.al(b,C.j,0,x,0,-1)
a.al(b,C.j,0,z,0,-1)}},
wj:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t
z=b*0.5
y=b*(1/(1+Math.sqrt(H.P(2))))*0.5
x=a.Q
w=b-1
if(w<0||w>=20)return H.b(x,w)
x[w]=0.5*b
x=a.r
v=new S.n(null,null)
v.a=C.c.j(0)
v.b=C.c.j(0)
x[w]=v
v=-z
x=-y
u=a.d
if(w>=u.length)return H.b(u,w)
u=u[w]
t=new S.n(null,null)
t.a=C.a.j(v)
t.b=C.a.j(x)
J.p(u,t)
t=a.d
if(w>=t.length)return H.b(t,w)
t=t[w]
u=new S.n(null,null)
u.a=C.a.j(v)
u.b=C.a.j(y)
J.p(t,u)
u=a.d
if(w>=u.length)return H.b(u,w)
u=u[w]
t=new S.n(null,null)
t.a=C.a.j(z)
t.b=C.a.j(z)
J.p(u,t)
t=a.d
if(w>=t.length)return H.b(t,w)
t=t[w]
u=new S.n(null,null)
u.a=C.c.j(0)
u.b=C.c.j(0)
J.p(t,u)
u=a.d
if(w>=u.length)return H.b(u,w)
w=u[w]
u=new S.n(null,null)
u.a=C.a.j(z)
u.b=C.a.j(v)
J.p(w,u)
S.L(a,b,v,y,v,x,!0,C.b,!1,1)}},
wi:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t
z=b+1
y=-z*0.5
x=a.d
w=b-1
if(w<0||w>=x.length)return H.b(x,w)
x=x[w]
v=new S.n(null,null)
v.a=C.d.j(-0.25)
v.b=C.a.j(y)
J.p(x,v)
z*=0.5
v=a.d
if(w>=v.length)return H.b(v,w)
v=v[w]
x=new S.n(null,null)
x.a=C.d.j(-0.25)
x.b=C.a.j(z)
J.p(v,x)
x=b*0.5
v=a.d
if(w>=v.length)return H.b(v,w)
v=v[w]
u=new S.n(null,null)
u.a=C.d.j(0.25)
u.b=C.a.j(x)
J.p(v,u)
u=-b*0.5
v=a.d
if(w>=v.length)return H.b(v,w)
v=v[w]
t=new S.n(null,null)
t.a=C.d.j(0.25)
t.b=C.a.j(u)
J.p(v,t)
t=a.Q
if(w>=20)return H.b(t,w)
t[w]=0.5
w=x+0.25
a.al(b,C.b,0,-w,1,-1)
a.al(b,C.b,0,w,1,1)
S.L(a,b,-0.25,z,-0.25,y,!0,C.b,!1,1)
S.L(a,b,0.25,u,0.25,x,!0,C.b,!1,1)}},
wh:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,5,!1,!1,C.b)}},
wg:{"^":"a:1;",
$2:function(a,b){return S.kK(a,b,108)}},
wf:{"^":"a:1;",
$2:function(a,b){return S.kK(a,b,36)}},
we:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=Math.cos(H.P(0.3141592653589793))*b*0.5
y=Math.sin(H.P(0.3141592653589793))
x=b*0.5
w=a.Q
v=b-1
if(v<0||v>=20)return H.b(w,v)
w[v]=x
w=z*0.5
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
t=new S.n(null,null)
t.a=C.a.j(w)
t.b=C.a.j(-x)
J.p(u,t)
t=-z*0.5
y=x+y*b*0.5
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
s=new S.n(null,null)
s.a=C.a.j(t)
s.b=C.a.j(-y)
J.p(u,s)
s=a.d
if(v>=s.length)return H.b(s,v)
s=s[v]
u=new S.n(null,null)
u.a=C.a.j(t)
u.b=C.a.j(y)
J.p(s,u)
u=a.d
if(v>=u.length)return H.b(u,v)
v=u[v]
u=new S.n(null,null)
u.a=C.a.j(w)
u.b=C.a.j(x)
J.p(v,u)
a.bD(b,C.l,w,0)
a.al(b,C.m,t,0,-1,0)}},
wd:{"^":"a:1;",
$2:function(a,b){return S.fh(a,b,C.n,C.k)}},
wc:{"^":"a:1;",
$2:function(a,b){return S.fh(a,b,C.l,C.m)}},
wb:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v
z=b*0.5
y=-z
x=a.d
w=b-1
if(w<0||w>=x.length)return H.b(x,w)
x=x[w]
v=new S.n(null,null)
v.a=C.a.j(y)
v.b=C.a.j(y)
J.p(x,v)
v=a.d
if(w>=v.length)return H.b(v,w)
v=v[w]
x=new S.n(null,null)
x.a=C.a.j(y)
x.b=C.a.j(z)
J.p(v,x)
x=a.d
if(w>=x.length)return H.b(x,w)
x=x[w]
v=new S.n(null,null)
v.a=C.a.j(z)
v.b=C.a.j(z)
J.p(x,v)
v=a.r
x=new S.n(null,null)
x.a=C.d.j(y/3)
x.b=C.d.j(z/3)
if(w>=20)return H.b(v,w)
v[w]=x
a.Q[w]=b/2
S.L(a,b,y,z,y,y,!0,C.b,!1,1)
S.L(a,b,z,z,y,z,!0,C.b,!1,1)
S.L(a,b,y,y,z,z,!0,C.b,!1,1)}},
w9:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,1,0.4,C.i,C.b,null,C.i,!1,!0)}},
w8:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,1,0.5,C.b,C.b,C.k,C.b,!1,!0)}},
w7:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,1,0.25,null,C.n,C.k,null,!1,!0)}},
w6:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,1/b,1,C.b,C.b,C.b,C.b,!1,!1)}},
w5:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,72,!0,C.b,!1)}},
w4:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,36,!0,C.b,!1)}},
w3:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u
z=b*0.5
y=-b
x=a.d
w=b-1
if(w<0||w>=x.length)return H.b(x,w)
x=x[w]
v=new S.n(null,null)
v.a=C.a.j(z)
v.b=C.c.j(y)
J.p(x,v)
v=-z
x=a.d
if(w>=x.length)return H.b(x,w)
x=x[w]
u=new S.n(null,null)
u.a=C.a.j(v)
u.b=C.c.j(b)
J.p(x,u)
u=a.d
if(w>=u.length)return H.b(u,w)
u=u[w]
x=new S.n(null,null)
x.a=C.a.j(z)
x.b=C.c.j(b)
J.p(u,x)
x=a.r
u=new S.n(null,null)
u.a=C.d.j(z/3)
u.b=C.d.j(b/3)
if(w>=20)return H.b(x,w)
x[w]=u
a.Q[w]=2*b/3
S.L(a,b,v,b,z,y,!0,C.b,!1,1)
S.L(a,b,z,b,v,b,!0,C.b,!1,1)
S.L(a,b,z,y,z,b,!0,C.b,!1,1)}},
w2:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u
z=b*0.5
y=-z
x=-b
w=a.d
v=b-1
if(v<0||v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.a.j(y)
u.b=C.c.j(x)
J.p(w,u)
u=a.d
if(v>=u.length)return H.b(u,v)
u=u[v]
w=new S.n(null,null)
w.a=C.a.j(y)
w.b=C.c.j(b)
J.p(u,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
u=new S.n(null,null)
u.a=C.a.j(z)
u.b=C.c.j(b)
J.p(w,u)
u=a.r
w=new S.n(null,null)
w.a=C.d.j(y/3)
w.b=C.d.j(b/3)
if(v>=20)return H.b(u,v)
u[v]=w
a.Q[v]=2*b/3
S.L(a,b,y,b,y,x,!0,C.b,!1,1)
S.L(a,b,z,b,y,b,!0,C.b,!1,1)
S.L(a,b,y,x,z,b,!0,C.b,!1,1)}},
vZ:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,1,45,!0,C.b)}},
vY:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,2,30,!0,C.b)}},
vX:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,3,30,!0,C.b)}},
vW:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,4,30,!0,C.b)}},
w1:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,0.45,0.3333333333333333*b,C.b,C.b,C.b,C.b,!0,!1)}},
w0:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,1,0.75,C.b,C.b,C.i,C.b,!1,!0)}},
vV:{"^":"a:1;",
$2:function(a,b){return S.dW(a,b,22.5,!1)}},
vU:{"^":"a:1;",
$2:function(a,b){return S.dW(a,b,22.5,!0)}},
vT:{"^":"a:1;",
$2:function(a,b){return S.fh(a,b,null,C.j)}},
vS:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,0.5/b,1,null,C.b,C.o,null,!1,!0)}},
vR:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,1,45,!1,C.b)}},
vQ:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,2,30,!1,C.b)}},
vO:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,3,30,!1,C.b)}},
vN:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,4,30,!1,C.b)}},
vM:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,25,!0,C.b,!1)}},
vL:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,25,!1,C.j,!0)}},
vK:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,13,!0,C.b,!1)}},
vJ:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,13,!1,C.j,!0)}},
vI:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,6.428571428571429,!0,C.b,!1)}},
vH:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,7,!0,!1,C.i)}},
vG:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,7,!0,!1,C.b)}},
vF:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,2,30,!1,C.i)}},
vD:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,3,30,!1,C.i)}},
vC:{"^":"a:1;",
$2:function(a,b){return S.b9(a,b,4,30,!1,C.i)}},
vB:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,0.25/b,0.25,C.b,C.b,C.b,C.b,!1,!1)}},
vA:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,3,!0,C.b,!1)}},
vz:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,25,!1,C.n,!0)}},
vy:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,9,!0,!1,C.b)}},
vx:{"^":"a:1;",
$2:function(a,b){return S.bm(a,b,80,!0,C.b,!1)}},
vw:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=b*0.25
y=b*0.4936
x=b*0.0436
w=a.Q
v=b-1
if(v<0||v>=20)return H.b(w,v)
w[v]=y
w=-z
u=-y
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
s=new S.n(null,null)
s.a=C.a.j(w)
s.b=C.a.j(u)
J.p(t,s)
s=a.d
if(v>=s.length)return H.b(s,v)
s=s[v]
t=new S.n(null,null)
t.a=C.a.j(w)
t.b=C.a.j(y)
J.p(s,t)
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
s=new S.n(null,null)
s.a=C.a.j(z)
s.b=C.a.j(y-x)
J.p(t,s)
s=a.d
if(v>=s.length)return H.b(s,v)
v=s[v]
s=new S.n(null,null)
s.a=C.a.j(z)
s.b=C.a.j(u+x)
J.p(v,s)
a.bD(b,C.l,z,0)
a.al(b,C.m,w,0,-1,0)}},
vv:{"^":"a:1;",
$2:function(a,b){return S.aG(a,b,0.5,0.5,C.b,C.b,C.b,C.b,!1,!1)}},
vu:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,4,!1,!1,C.i)}},
ww:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,4,!1,!1,C.j)}},
wv:{"^":"a:1;",
$2:function(a,b){return S.dW(a,b,30,!1)}},
wu:{"^":"a:1;",
$2:function(a,b){return S.dW(a,b,30,!0)}},
wl:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,8,!0,!0,C.b)}},
wa:{"^":"a:1;",
$2:function(a,b){return S.b_(a,b,4,!1,!0,C.b)}},
w_:{"^":"a:9;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=b*0.25
y=z*0.25
x=-b
w=a.r
v=b-1
u=new S.n(null,null)
u.a=C.a.j(x*0.5)
u.b=C.c.j(0)
if(v<0||v>=20)return H.b(w,v)
w[v]=u
a.Q[v]=b*0.5
u=-z
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.c.j(x)
t.b=C.a.j(u)
J.p(w,t)
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
w=new S.n(null,null)
w.a=C.c.j(x)
w.b=C.a.j(z)
J.p(t,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.c.j(b)
t.b=C.a.j(z)
J.p(w,t)
t=a.d
if(v>=t.length)return H.b(t,v)
t=t[v]
w=new S.n(null,null)
w.a=C.c.j(b)
w.b=C.a.j(y)
J.p(t,w)
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
t=new S.n(null,null)
t.a=C.c.j(0)
t.b=C.a.j(y)
J.p(w,t)
t=-y
w=a.d
if(v>=w.length)return H.b(w,v)
w=w[v]
s=new S.n(null,null)
s.a=C.c.j(0)
s.b=C.a.j(t)
J.p(w,s)
s=a.d
if(v>=s.length)return H.b(s,v)
s=s[v]
w=new S.n(null,null)
w.a=C.c.j(b)
w.b=C.a.j(t)
J.p(s,w)
w=a.d
if(v>=w.length)return H.b(w,v)
v=w[v]
w=new S.n(null,null)
w.a=C.c.j(b)
w.b=C.a.j(u)
J.p(v,w)
a.bD(b,C.k,0,0)
S.L(a,b,x,z,x,u,!0,C.b,!1,1)
S.L(a,b,x,u,b,u,!0,C.b,!1,1)
S.L(a,b,b,z,x,z,!0,C.b,!1,1)}},
vP:{"^":"a:1;",
$2:function(a,b){return S.fi(a,b,0.25,45,!0,!0)}},
vE:{"^":"a:1;",
$2:function(a,b){return S.fi(a,b,0.5,75.75,!1,!0)}},
rU:{"^":"a:20;",
$2:function(a,b){return J.bZ(J.am(a),J.am(b))}},
rV:{"^":"k;aT:a<,b,c,d,e,f,r,x,B:y>,z,Q",
ay:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=document
y=z.createElement("div")
y.className="ui shipbox"
z=document
x=z.createElement("div")
x.className="shipcanvascontainer"
y.appendChild(x)
z=document
w=z.createElement("div")
w.className="shipbgleft"
x.appendChild(w)
z=document
v=z.createElement("div")
v.className="shipbgmid"
x.appendChild(v)
z=document
u=z.createElement("div")
u.className="shipbgright"
x.appendChild(u)
x.appendChild(this.z.c)
z=document
t=z.createElement("span")
t.className="shipname"
t.textContent="Ship name"
this.b=t
x.appendChild(t)
z=document
s=z.createElement("span")
s.className="shipfaction"
s.textContent="Faction"
this.c=s
x.appendChild(s)
z=document
r=z.createElement("span")
r.className="shipdirty"
J.aq(r,'<i class="glyphicon glyphicon-floppy-remove"></i>')
r.title="This ship has had some block IDs rearranged and needs to be saved to keep the changes"
this.d=r
x.appendChild(r)
z=document
q=z.createElement("div")
q.className="menu"
J.aq(q,'<div class="menuicon"><i class="glyphicon glyphicon-floppy-disk"></i></div>Save')
S.U(q,new S.t_(this))
y.appendChild(q)
z=document
p=z.createElement("div")
p.className="menu"
J.aq(p,'<div class="menuicon"><i class="glyphicon glyphicon-refresh"></i></div>Redraw')
S.U(p,new S.t0(this))
y.appendChild(p)
z=document
o=z.createElement("div")
o.className="menu"
J.aq(o,'<div class="menuicon"><i class="glyphicon glyphicon-trash"></i></div>Remove')
S.U(o,new S.t1(this))
y.appendChild(o)
z=document
n=z.createElement("div")
n.className="shipoverlay"
J.aq(n,"Remove this ship?<br/>Any unsaved id changes<br/>will be lost.<br/><br/>")
z=document
m=z.createElement("div")
m.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
m.title="Remove the ship"
S.U(m,new S.t2(this))
n.appendChild(m)
z=document
l=z.createElement("div")
l.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
l.title="Keep the ship"
S.U(l,new S.t3(this))
n.appendChild(l)
this.e=n
y.appendChild(n)
this.a=y
document.querySelector("#shiplist").appendChild(y)
this.a1(0)
this.dA()
S.dY()},
a1:function(a){var z,y,x,w,v,u
if(this.a!=null){this.b.textContent=this.y
y=$.by.c
x=y.length
w=0
while(!0){if(!(w<y.length)){z=!1
break}v=y[w]
if(J.y(J.a8(v.gW(),"ident"),this.x)){u=J.a8(v.gW(),"name")
if(J.dl(u)!==!0){this.c.textContent=u
z=!0}else z=!1
break}y.length===x||(0,H.x)(y);++w}if(!z)this.c.textContent="F"+H.e(this.x)}y=this.Q
x=this.d
if(y){y=x.style
y.visibility="visible"}else{y=x.style
y.visibility="hidden"}},
iT:function(){var z,y,x,w,v,u,t
z=P.as()
for(y=$.aH.c,x=y.length,w=this.r,v=0;v<y.length;y.length===x||(0,H.x)(y),++v){u=y[v]
t=J.a8(u.gW(),"ident")
if(w.M(0,t))z.i(0,t,u)}return z},
dA:function(){var z,y,x,w,v,u,t
z=this.iT()
if(z.gk(z)!==this.r.a){y=this.z
J.aS(y.d,0,0,y.a,y.b)
y=this.z.d
x=J.f(y)
x.saU(y,"#A0A0A0")
x.scC(y,""+C.a.aq(Math.floor(this.z.b*0.35))+"px Droid Sans Mono")
x.sdV(y,"center")
w=this.z
x.bG(y,"?",w.a*0.5,w.b*0.5)
x.scC(y,"12px Droid Sans Mono")
w=this.z
x.bG(y,"Unable to draw ship",w.a*0.5,w.b*0.65)
w=this.z
x.bG(y,"due to missing blocks",w.a*0.5,w.b*0.65+18)
return}v=[]
for(y=this.f,x=y.length,u=0;u<y.length;y.length===x||(0,H.x)(y),++u){t=y[u]
v.push(new S.mJ(z.h(0,t.a),J.u(t.b,0.1),J.u(t.c,0.1),t.d))}y=this.z
J.aS(y.d,0,0,y.a,y.b)
this.z.iQ(v,-0.39269908169872414,10)},
jz:function(a){var z,y,x,w,v,u,t
z=this.r
z.aF(0)
for(y=this.f,x=y.length,w=!1,v=0;v<y.length;y.length===x||(0,H.x)(y),++v){u=y[v]
if(a.H(0,u.a)){t=u.a
if(!J.y(t,a.h(0,t))){u.a=a.h(0,u.a)
w=!0}}if(!z.M(0,u.a))z.F(0,u.a)}if(w){this.Q=!0
this.a1(0)}},
aK:function(){J.aL(this.a)
C.e.ad($.$get$ba(),this)
S.dY()},
hn:function(a){var z,y,x,w,v,u,t
z=S.cJ(190,190)
z.e=!1
this.z=z
if(J.aP(a).f5(a,".lua"))a=C.f.bd(a,0,a.length-4)
this.x=0
y=a.split("_")
if(y.length>0){x=H.a1(y[0],null,new S.rZ())
if(!J.y(x,-1))this.x=x
C.e.bF(y,"removeAt")
if(0>=y.length)H.F(P.c4(0,null,null))
y.splice(0,1)[0]}for(z=y.length,w="",v=0;v<y.length;y.length===z||(0,H.x)(y),++v){u=y[v]
if(w.length!==0)w+=" "
t=J.N(u)
w=J.a6(t.gk(u),1)?w+(t.bd(u,0,1).toUpperCase()+t.bc(u,1)):w+t.jJ(u)}this.y=w
$.$get$ba().push(this)
S.dY()},
C:{
rW:function(a){var z=new S.rV(null,null,null,null,null,[],P.ab(null,null,null,P.E),null,null,null,!1)
z.hn(a)
return z},
rY:function(){var z,y,x,w
for(z=$.$get$ba().length-1;z>=0;--z){y=$.$get$ba()
if(z>=y.length)return H.b(y,z)
y=y[z]
x=y.a
w=x.parentNode
if(w!=null)w.removeChild(x)
C.e.ad($.$get$ba(),y)
S.dY()}},
t4:function(){var z,y,x
for(z=$.$get$ba(),y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x)z[x].dA()},
kL:function(){var z,y,x
for(z=$.$get$ba(),y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x)z[x].a1(0)},
dY:function(){var z,y,x
for(z=$.aH.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x)z[x].fB(!1)}}},
rZ:{"^":"a:2;",
$1:function(a){return-1}},
t_:{"^":"a:0;a",
$1:function(a){S.rK(this.a)}},
t0:{"^":"a:0;a",
$1:function(a){this.a.dA()}},
t1:{"^":"a:0;a",
$1:function(a){var z=this.a.e.style
z.visibility="visible"}},
t2:{"^":"a:0;a",
$1:function(a){this.a.aK()}},
t3:{"^":"a:0;a",
$1:function(a){var z=this.a.e.style
z.visibility="hidden"}},
rX:{"^":"k;a6:a>,n:b*,m:c*,d,e"},
t8:{"^":"k;a,b,c",
bx:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.a*0.5
y=z*0.95
x=y/b
J.bC(this.c,"#303030")
for(w=0;w<b;){J.eh(this.c);++w
J.m8(this.c,z,z,w*x,0,6.283185307179586)
J.ep(this.c)}J.eh(this.c)
v=6.283185307179586/c
for(w=0;w<c;++w){J.hf(this.c,z,z)
u=v*w
t=Math.sin(u)
s=Math.cos(u)
J.hd(this.c,z+t*y,z+s*y)}J.ep(this.c)},
jL:function(a,b){var z=this.a
J.aS(this.c,0,0,z,z)
this.bx(0,5,16)
this.c_(b)},
a1:function(a){return this.jL(a,null)},
c_:function(b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
z=$.be.c.length
y=6.283185307179586/z
x=this.a
w=x*0.95*0.5
v=w*0.025
J.ms(this.c,"center")
u=[]
if(b1!=null){t=J.a8(b1.gW(),"position")
s=t==null
r=s?0.1:J.ad(t,"0")
if(typeof r!=="number")return H.C(r)
q=w*r
s=s?1:J.ad(t,"1")
if(typeof s!=="number")return H.C(s)
p=w*s
J.bC(this.c,"rgba(255,255,0,0.25)")
J.bB(this.c,"rgba(255,255,0,0.025)")
s=this.c
r=J.f(s)
r.Z(s)
o=x*0.5
r.aB(s,o,o,q,0,6.283185307179586)
r.eP(s,o,o,p,0,6.283185307179586,!0)
r.a8(s)
r.az(s)
s=this.c
r=J.f(s)
r.Z(s)
r.aB(s,o,o,q,0,6.283185307179586)
r.a8(s)
r.a3(s)
s=this.c
r=J.f(s)
r.Z(s)
r.aB(s,o,o,p,0,6.283185307179586)
r.a8(s)
r.a3(s)}for(x*=0.5,s=J.r(b1),n=0;n<z;++n){r=$.be.c
if(n>=r.length)return H.b(r,n)
m=r[n]
l=J.a8(m.gW(),"ident")
k=J.a8(m.gW(),"radius")
t=J.a8(m.gW(),"position")
j=0.6283185307179586+y*n
r=t==null
o=r?0.1:J.ad(t,"0")
if(typeof o!=="number")return H.C(o)
q=w*o
o=r?1:J.ad(t,"1")
if(typeof o!=="number")return H.C(o)
p=w*o
o=r?0.1:J.ad(k,"0")
if(typeof o!=="number")return H.C(o)
r=r?0.15:J.ad(k,"1")
if(typeof r!=="number")return H.C(r)
i=Math.sin(j)
h=Math.cos(j)
g=i*q
f=h*q
e=i*p
d=h*p
c=x+(g+e)*0.5
b=x+(f+d)*0.5
a=m.gjy()
if(a!=null){a0=J.N(a)
a1="rgba("+H.e(a0.h(a,"r"))+","+H.e(a0.h(a,"g"))+","+H.e(a0.h(a,"b"))+",0.1)"
a2="rgba("+H.e(a0.h(a,"r"))+","+H.e(a0.h(a,"g"))+","+H.e(a0.h(a,"b"))+",0.75)"
H.e(a0.h(a,"r"))
H.e(a0.h(a,"g"))
H.e(a0.h(a,"b"))}else{a1="rgba(127,127,127,0.1)"
a2="rgba(127,127,127,0.75)"}J.bB(this.c,a1)
J.bC(this.c,a2)
a0=this.c
a3=J.f(a0)
a3.Z(a0)
a3.aB(a0,c,b,w*o,0,6.283185307179586)
a3.a8(a0)
a3.az(a0)
a3.a3(a0)
o=s.S(b1,m)
a0=this.c
if(o)J.bC(a0,"#FFFF00")
else J.bC(a0,a2)
o=this.c
a0=J.f(o)
a0.Z(o)
a0.aB(o,c,b,w*r,0,6.283185307179586)
a0.a8(o)
a0.az(o)
a0.a3(o)
o=this.c
a0=J.f(o)
a0.Z(o)
r=x+g
a3=h*v
a4=x+f
a5=i*v
a0.ab(o,r-a3,a4+a5)
a0.T(o,r+a3,a4-a5)
o=this.c
a0=x+e
a6=x+d
a7=J.f(o)
a7.ab(o,a0-a3,a6+a5)
a7.T(o,a0+a3,a6-a5)
a5=this.c
a3=J.f(a5)
a3.ab(a5,r,a4)
a3.T(a5,a0,a6)
a3.a3(a5)
if(!J.y(l,0))u.push(P.ae(["id",l,"x",c,"y",b,"fill",J.y(m,b1)?"#FFFF00":"#CCCCCC"]))}for(x=u.length,a8=0;a8<u.length;u.length===x||(0,H.x)(u),++a8){a9=u[a8]
c=a9.h(0,"x")
b=a9.h(0,"y")
l=a9.h(0,"id")
a1=a9.h(0,"fill")
b0=J.ei(J.G(b,3))+0.5
J.bB(this.c,"#000000")
s=J.Y(c)
r=b0-1
J.c_(this.c,H.e(l),s.ac(c,1),r)
J.c_(this.c,H.e(l),s.t(c,1),r)
J.c_(this.c,H.e(l),s.ac(c,1),b0)
J.c_(this.c,H.e(l),s.t(c,1),b0)
r=b0+1
J.c_(this.c,H.e(l),s.ac(c,1),r)
J.c_(this.c,H.e(l),s.t(c,1),r)
J.bB(this.c,a1)
J.c_(this.c,H.e(l),c,b0)}}},
tu:{"^":"a:5;a",
$1:[function(a){S.kR(this.a)},null,null,2,0,null,0,"call"]},
mH:{"^":"k;aT:a<,b,a7:c>,d",
c1:function(a){var z
if(!this.d){this.d=!0
z=this.a.style
z.display="block"
z=this.b.style
z.display="block"
z=this.c
z.className="button glyphicon glyphicon-minus"
z.title="Collapse group"}},
h9:function(a,b){var z,y,x,w,v,u
z=document
y=z.createElement("table")
y.id="moduletable_"+a
y.className="inlineblock"
z=document
x=z.createElement("tr")
y.appendChild(x)
z=document
w=z.createElement("td")
x.appendChild(w)
z=document
v=z.createElement("div")
v.className="button glyphicon glyphicon-plus"
v.title="Expand group"
v.id="expand_"+a
J.a7(v,"click",new S.mI(this),null)
w.appendChild(v)
this.c=v
z=document
u=z.createElement("td")
x.appendChild(u)
u.id="module_"+a
u.className="nodisplay"
u.appendChild(b)
this.b=u
this.a=y},
C:{
cK:function(a,b){var z=new S.mH(null,null,null,!1)
z.h9(a,b)
return z}}},
mI:{"^":"a:0;a",
$1:[function(a){var z,y,x,w
z=J.f(a)
if(z.ga7(a)!==0)return
y=J.dq(H.q(z.gaX(a),"$isW").id,7)
x="#moduletable_"+y
document.querySelector(x)
x="#module_"+y
if(document.querySelector(x)==null){P.cD("element not found")
return}x=this.a
if(x.d){x.d=!1
w=x.a.style
w.display="inline-block"
w=x.b.style
w.display="none"
x=x.c
x.className="button glyphicon glyphicon-plus"
x.title="Expand group"}else x.c1(0)
z.b_(a)},null,null,2,0,null,0,"call"]},
wZ:{"^":"a:2;",
$1:function(a){return}},
x_:{"^":"a:2;",
$1:function(a){return}},
wx:{"^":"a:0;a,b",
$1:[function(a){var z,y,x
this.a.$0()
z=document.querySelector("#confirmbox").style
z.display="none"
z=document.querySelector("#alertbackground").style
z.display="none"
document.querySelector("#confirmtext").textContent=""
document.querySelector("#confirmtitle").textContent=""
z=$.e4
y=z!=null
if(y){x=this.b
x.toString
if(y)J.ef(x,"click",z,null)}},null,null,2,0,null,0,"call"]},
jF:{"^":"k;a,b,aT:c<,d,e,f,r,x,y",
a1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.f
y=this.c
if(z)y.className="ui shapedisplay selected"
else y.className="ui shapedisplay"
z=this.b
J.aS(z.d,0,0,z.a,z.b)
x=P.a0(this.a.gai(),this.d)
this.b.f3(this.a,x)
this.b.iO(this.a,!0,"#606060","#202020",this.y,"#BBBBBB",!0,x)
z=J.a6(this.d,this.a.gai())
y=this.r
if(z){z=y.style
z.display="block"}else{z=y.style
z.display="none"}z=this.a.gfa()
y=x-1
if(y>>>0!==y||y>=20)return H.b(z,y)
w=z[y]
z=J.cE(this.a)
if(y>=z.length)return H.b(z,y)
y="<span title='Area, used when calculating mass and health' class='glyphicon glyphicon-fullscreen'>"+J.eq(z[y],2)+"</span> <span title='Allowed block scales' class='glyphicon glyphicon-stats'>1"
v=y+(this.a.gai()===1?"":"-"+H.e(this.a.gai()))+"</span><br/>"
J.aq(this.x,v)
for(z=w.gI(w),z=z.gA(z);z.l();){u=z.gp()
y=this.x
t=document
t=t.createElement("span")
s=J.f(u)
t.className="glyphicon glyphicon-"+H.e(s.gdF(u))
r=t.style
q=u.geV()
r.color=q
t.textContent=H.e(w.h(0,u))
t.title=H.e(s.gB(u))+" hardpoints"
J.a7(t,"mouseenter",new S.rQ(this,u),null)
J.a7(t,"mouseleave",new S.rR(this),null)
y.appendChild(t)
y=this.x
t=document
y.appendChild(t.createElement("br"))}this.c.title=""},
hm:function(a,b,c,d){var z,y,x,w,v
z=document
z=z.createElement("div")
z.className="ui shapedisplay"
y=z.style
x=""+d+"px"
y.width=x
y=z.style
x=""+d+"px"
y.height=x
J.a7(z,"click",new S.rP(this),null)
this.c=z
z=S.cJ(d,d)
this.b=z
this.c.appendChild(z.c)
z=document
z=z.createElement("div")
z.className="shapeoverlay"
J.aq(z,"<span>Scale too high!<br/>Max scale: "+H.e(this.a.gai())+"</span>")
this.r=z
this.c.appendChild(z)
z=this.c
y=document
y=y.createElement("span")
y.className="shapename"
x=this.a
w=J.r(x)
y.textContent=!!w.$isb5?"Custom: "+H.e(w.gB(x)):w.gB(x)
z.appendChild(y)
z=document
v=z.createElement("span")
this.x=v
v.textContent="Shape info"
v.className="componentinfo"
this.c.appendChild(v)
this.f=c
this.a1(0)},
C:{
rO:function(a,b,c,d){var z=new S.jF(a,null,null,b,null,!1,null,null,null)
z.hm(a,b,c,d)
return z},
jG:function(a,b){if(!J.y(a.y,b)){a.y=b
a.a1(0)}}}},
rP:{"^":"a:5;a",
$1:[function(a){var z,y
z=this.a
y=z.e
if(y!=null)y.fH(z)
return},null,null,2,0,null,0,"call"]},
rQ:{"^":"a:5;a,b",
$1:[function(a){return S.jG(this.a,this.b)},null,null,2,0,null,0,"call"]},
rR:{"^":"a:5;a",
$1:[function(a){return S.jG(this.a,null)},null,null,2,0,null,0,"call"]},
dU:{"^":"k;a,b",
jZ:[function(a,b,c){return J.T(J.u(b,this.b),J.u(c,this.a))},"$2","gn",4,0,17,7,13],
k_:[function(a,b,c){return J.G(J.u(b,this.a),J.u(c,this.b))},"$2","gm",4,0,17,7,13]},
vl:{"^":"a:0;a",
$1:[function(a){var z=J.f(a)
if(z.ga7(a)!==0)return
this.a.$1(a)
z.c9(a)
z.a2(a)},null,null,2,0,null,0,"call"]}},1],["","",,H,{"^":"",z9:{"^":"k;a"}}],["","",,J,{"^":"",
r:function(a){return void 0},
ea:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
e6:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.fP==null){H.wR()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.db("Return interceptor for "+H.e(y(a,z))))}w=H.x1(a)
if(w==null){if(typeof a=="function")return C.Q
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.V
else return C.ae}return w},
j:{"^":"k;",
S:function(a,b){return a===b},
gah:function(a){return H.bO(a)},
v:["fZ",function(a){return H.dR(a)}],
dL:["fY",function(a,b){throw H.c(P.jd(a,b.gfi(),b.gfo(),b.gfk(),null))},null,"gjm",2,0,null,14],
gaf:function(a){return new H.da(H.fN(a),null)},
"%":"ANGLEInstancedArrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|BarProp|Bluetooth|BluetoothGATTCharacteristic|BluetoothGATTRemoteServer|BluetoothGATTService|BluetoothUUID|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CanvasGradient|CanvasPattern|Clients|CompositorProxy|ConsoleBase|Coordinates|CredentialsContainer|Crypto|DOMFileSystemSync|DOMImplementation|DOMParser|DOMStringMap|DataTransfer|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXTsRGB|EffectModel|EntrySync|FileEntrySync|FileReaderSync|FileWriterSync|Geofencing|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBFactory|ImageBitmap|InjectedScriptHost|InputDevice|KeyframeEffect|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaSession|MemoryInfo|MessageChannel|Metadata|MutationObserver|NavigatorStorageUtils|NodeFilter|NonDocumentTypeChildNode|NonElementParentNode|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|PagePopupController|PerformanceTiming|PeriodicSyncManager|PeriodicSyncRegistration|PeriodicWave|Permissions|PositionError|PositionSensorVRDevice|PushManager|PushMessageData|PushSubscription|RTCIceCandidate|Range|ReadableByteStream|ReadableByteStreamReader|ReadableStream|ReadableStreamReader|SQLError|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGPreserveAspectRatio|SVGUnitTypes|Screen|ScrollState|SharedArrayBuffer|SpeechRecognitionAlternative|StorageInfo|StorageQuota|SubtleCrypto|SyncManager|SyncRegistration|TextMetrics|VRDevice|VREyeParameters|VRFieldOfView|VRPositionState|ValidityState|VideoPlaybackQuality|WebGLBuffer|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLRenderingContext|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WorkerConsole|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate"},
pk:{"^":"j;",
v:function(a){return String(a)},
gah:function(a){return a?519018:218159},
gaf:function(a){return C.aa},
$isbc:1},
j_:{"^":"j;",
S:function(a,b){return null==b},
v:function(a){return"null"},
gah:function(a){return 0},
gaf:function(a){return C.a4},
dL:[function(a,b){return this.fY(a,b)},null,"gjm",2,0,null,14]},
eT:{"^":"j;",
gah:function(a){return 0},
gaf:function(a){return C.a3},
v:["h0",function(a){return String(a)}],
$isj0:1},
rj:{"^":"eT;"},
cw:{"^":"eT;"},
d1:{"^":"eT;",
v:function(a){var z=a[$.$get$dw()]
return z==null?this.h0(a):J.aU(z)},
$isdL:1},
cp:{"^":"j;",
dr:function(a,b){if(!!a.immutable$list)throw H.c(new P.z(b))},
bF:function(a,b){if(!!a.fixed$length)throw H.c(new P.z(b))},
F:function(a,b){this.bF(a,"add")
a.push(b)},
ad:function(a,b){var z
this.bF(a,"remove")
for(z=0;z<a.length;++z)if(J.y(a[z],b)){a.splice(z,1)
return!0}return!1},
av:function(a,b){var z
this.bF(a,"addAll")
for(z=J.a5(b);z.l();)a.push(z.gp())},
V:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.ar(a))}},
bk:function(a,b){return H.l(new H.cs(a,b),[null,null])},
c6:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.e(a[x])
if(x>=z)return H.b(y,x)
y[x]=w}return y.join(b)},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
gP:function(a){if(a.length>0)return a[0]
throw H.c(H.aD())},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aD())},
e4:function(a,b,c,d,e){var z,y,x
this.dr(a,"set range")
P.fd(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.F(P.ao(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.pi())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.b(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.b(d,x)
a[b+y]=d[x]}},
cr:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.ar(a))}return!1},
cn:function(a,b){var z
this.dr(a,"sort")
z=b==null?P.wC():b
H.d7(a,0,a.length-1,z)},
c3:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.y(a[z],b))return z
return-1},
bI:function(a,b){return this.c3(a,b,0)},
c7:function(a,b,c){var z
if(c.aN(0,0))return-1
if(c.bL(0,a.length))c=a.length-1
for(z=c;z>=0;--z){if(z>=a.length)return H.b(a,z)
if(J.y(a[z],b))return z}return-1},
cF:function(a,b){return this.c7(a,b,null)},
M:function(a,b){var z
for(z=0;z<a.length;++z)if(J.y(a[z],b))return!0
return!1},
gR:function(a){return a.length===0},
v:function(a){return P.dN(a,"[","]")},
gA:function(a){return H.l(new J.cH(a,a.length,0,null),[H.ah(a,0)])},
gah:function(a){return H.bO(a)},
gk:function(a){return a.length},
sk:function(a,b){this.bF(a,"set length")
if(b<0)throw H.c(P.ao(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.at(a,b))
if(b>=a.length||b<0)throw H.c(H.at(a,b))
return a[b]},
i:function(a,b,c){this.dr(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.at(a,b))
if(b>=a.length||b<0)throw H.c(H.at(a,b))
a[b]=c},
$isO:1,
$asO:I.aI,
$isi:1,
$asi:null,
$iso:1,
$ish:1,
$ash:null},
z8:{"^":"cp;"},
cH:{"^":"k;a,b,c,d",
gp:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.x(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
d_:{"^":"j;",
aS:function(a,b){var z
if(typeof b!=="number")throw H.c(H.I(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcE(b)
if(this.gcE(a)===z)return 0
if(this.gcE(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gcE:function(a){return a===0?1/a<0:a<0},
dR:function(a,b){return a%b},
dk:function(a){return Math.abs(a)},
aq:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(new P.z(""+a))},
iX:function(a){return this.aq(Math.floor(a))},
cK:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.z(""+a))},
ds:function(a,b,c){if(this.aS(b,c)>0)throw H.c(H.I(b))
if(this.aS(a,b)<0)return b
if(this.aS(a,c)>0)return c
return a},
j:function(a){return a},
ce:function(a,b){var z
H.dg(b)
if(b>20)throw H.c(P.ao(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gcE(a))return"-"+z
return z},
fz:function(a,b){var z,y,x,w
H.dg(b)
if(b<2||b>36)throw H.c(P.ao(b,2,36,"radix",null))
z=a.toString(b)
if(C.f.aC(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.F(new P.z("Unexpected toString result: "+z))
x=J.N(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.f.Y("0",w)},
v:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gah:function(a){return a&0x1FFFFFFF},
ci:function(a){return-a},
t:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a+b},
ac:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a-b},
aM:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a/b},
Y:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a*b},
bM:function(a,b){var z
if(typeof b!=="number")throw H.c(H.I(b))
z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
bz:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aq(a/b)},
au:function(a,b){return(a|0)===a?a/b|0:this.aq(a/b)},
fQ:function(a,b){if(b<0)throw H.c(H.I(b))
return b>31?0:a<<b>>>0},
i7:function(a,b){return b>31?0:a<<b>>>0},
e6:function(a,b){var z
if(b<0)throw H.c(H.I(b))
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
dh:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
fD:function(a,b){return(a&b)>>>0},
h7:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return(a^b)>>>0},
aN:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a<b},
ak:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a>b},
cN:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a<=b},
bL:function(a,b){if(typeof b!=="number")throw H.c(H.I(b))
return a>=b},
gaf:function(a){return C.ad},
$isaR:1},
iZ:{"^":"d_;",
gaf:function(a){return C.ac},
$isaC:1,
$isaR:1,
$isE:1},
iY:{"^":"d_;",
gaf:function(a){return C.ab},
$isaC:1,
$isaR:1},
d0:{"^":"j;",
aC:function(a,b){if(b<0)throw H.c(H.at(a,b))
if(b>=a.length)throw H.c(H.at(a,b))
return a.charCodeAt(b)},
dm:function(a,b,c){H.b1(b)
H.dg(c)
if(c>b.length)throw H.c(P.ao(c,0,b.length,null,null))
return new H.uO(b,a,c)},
dl:function(a,b){return this.dm(a,b,0)},
dK:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.ao(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.aC(b,c+y)!==this.aC(a,y))return
return new H.fk(c,b,a)},
t:function(a,b){if(typeof b!=="string")throw H.c(P.ds(b,null,null))
return a+b},
f5:function(a,b){var z,y
H.b1(b)
z=b.length
y=a.length
if(z>y)return!1
return b===this.bc(a,y-z)},
jA:function(a,b,c){H.b1(c)
return H.ed(a,b,c)},
jB:function(a,b,c){return H.aJ(a,b,c,null)},
fS:function(a,b){if(b==null)H.F(H.I(b))
if(typeof b==="string")return a.split(b)
else if(b instanceof H.j2&&b.geu().exec('').length-2===0)return a.split(b.ghU())
else return this.hE(a,b)},
hE:function(a,b){var z,y,x,w,v,u,t
z=H.l([],[P.t])
for(y=J.fZ(b,a),y=y.gA(y),x=0,w=1;y.l();){v=y.gp()
u=v.ge7(v)
t=v.gf4(v)
w=t-u
if(w===0&&x===u)continue
z.push(this.bd(a,x,u))
x=t}if(x<a.length||w>0)z.push(this.bc(a,x))
return z},
fT:function(a,b,c){var z
H.dg(c)
if(c>a.length)throw H.c(P.ao(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.mk(b,a,c)!=null},
cS:function(a,b){return this.fT(a,b,0)},
bd:function(a,b,c){var z
if(typeof b!=="number"||Math.floor(b)!==b)H.F(H.I(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.F(H.I(c))
z=J.Y(b)
if(z.aN(b,0))throw H.c(P.c4(b,null,null))
if(z.ak(b,c))throw H.c(P.c4(b,null,null))
if(J.a6(c,a.length))throw H.c(P.c4(c,null,null))
return a.substring(b,c)},
bc:function(a,b){return this.bd(a,b,null)},
jI:function(a){return a.toLowerCase()},
jJ:function(a){return a.toUpperCase()},
jK:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aC(z,0)===133){x=J.pm(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.aC(z,w)===133?J.pn(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
Y:function(a,b){var z,y
if(typeof b!=="number")return H.C(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.D)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fm:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.Y(c,z)+a},
c3:function(a,b,c){if(c>a.length)throw H.c(P.ao(c,0,a.length,null,null))
return a.indexOf(b,c)},
bI:function(a,b){return this.c3(a,b,0)},
c7:function(a,b,c){var z,y,x
if(b==null)H.F(H.I(b))
c=a.length
if(typeof b==="string"){z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)}for(z=J.aP(b),x=c;x>=0;--x)if(z.dK(b,a,x)!=null)return x
return-1},
cF:function(a,b){return this.c7(a,b,null)},
f_:function(a,b,c){if(b==null)H.F(H.I(b))
if(c>a.length)throw H.c(P.ao(c,0,a.length,null,null))
return H.xG(a,b,c)},
M:function(a,b){return this.f_(a,b,0)},
gR:function(a){return a.length===0},
aS:function(a,b){var z
if(typeof b!=="string")throw H.c(H.I(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
v:function(a){return a},
gah:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gaf:function(a){return C.a5},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.at(a,b))
if(b>=a.length||b<0)throw H.c(H.at(a,b))
return a[b]},
$isO:1,
$asO:I.aI,
$ist:1,
$isf9:1,
C:{
j1:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
pm:function(a,b){var z,y
for(z=a.length;b<z;){y=C.f.aC(a,b)
if(y!==32&&y!==13&&!J.j1(y))break;++b}return b},
pn:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.f.aC(a,z)
if(y!==32&&y!==13&&!J.j1(y))break}return b}}}}],["","",,H,{"^":"",
de:function(a,b){var z=a.c0(b)
if(!init.globalState.d.cy)init.globalState.f.cb()
return z},
m_:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.r(y).$isi)throw H.c(P.b3("Arguments to main must be a List: "+H.e(y)))
init.globalState=new H.uy(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$iV()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.u2(P.eW(null,H.dd),0)
y.z=H.l(new H.a2(0,null,null,null,null,null,0),[P.E,H.fA])
y.ch=H.l(new H.a2(0,null,null,null,null,null,0),[P.E,null])
if(y.x===!0){x=new H.ux()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.pb,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.uz)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.l(new H.a2(0,null,null,null,null,null,0),[P.E,H.dT])
w=P.ab(null,null,null,P.E)
v=new H.dT(0,null,!1)
u=new H.fA(y,x,w,init.createNewIsolate(),v,new H.c1(H.ec()),new H.c1(H.ec()),!1,!1,[],P.ab(null,null,null,null),null,null,!1,!0,P.ab(null,null,null,null))
w.F(0,0)
u.ed(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.cB()
x=H.bY(y,[y]).bf(a)
if(x)u.c0(new H.xE(z,a))
else{y=H.bY(y,[y,y]).bf(a)
if(y)u.c0(new H.xF(z,a))
else u.c0(a)}init.globalState.f.cb()},
pf:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.pg()
return},
pg:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.z("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.z('Cannot extract URI from "'+H.e(z)+'"'))},
pb:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.e_(!0,[]).bt(b.data)
y=J.N(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.e_(!0,[]).bt(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.e_(!0,[]).bt(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.l(new H.a2(0,null,null,null,null,null,0),[P.E,H.dT])
p=P.ab(null,null,null,P.E)
o=new H.dT(0,null,!1)
n=new H.fA(y,q,p,init.createNewIsolate(),o,new H.c1(H.ec()),new H.c1(H.ec()),!1,!1,[],P.ab(null,null,null,null),null,null,!1,!0,P.ab(null,null,null,null))
p.F(0,0)
n.ed(0,o)
init.globalState.f.a.b1(0,new H.dd(n,new H.pc(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.cb()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ce(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.cb()
break
case"close":init.globalState.ch.ad(0,$.$get$iW().h(0,a))
a.terminate()
init.globalState.f.cb()
break
case"log":H.pa(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.c7(!0,P.cx(null,P.E)).aO(q)
y.toString
self.postMessage(q)}else P.cD(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},null,null,4,0,null,21,0],
pa:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.c7(!0,P.cx(null,P.E)).aO(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.a3(w)
z=H.aB(w)
throw H.c(P.dC(z))}},
pd:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.jw=$.jw+("_"+y)
$.jx=$.jx+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ce(f,["spawned",new H.e1(y,x),w,z.r])
x=new H.pe(a,b,c,d,z)
if(e===!0){z.eM(w,w)
init.globalState.f.a.b1(0,new H.dd(z,x,"start isolate"))}else x.$0()},
v6:function(a){return new H.e_(!0,[]).bt(new H.c7(!1,P.cx(null,P.E)).aO(a))},
xE:{"^":"a:3;a,b",
$0:function(){this.b.$1(this.a.a)}},
xF:{"^":"a:3;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
uy:{"^":"k;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",C:{
uz:[function(a){var z=P.ae(["command","print","msg",a])
return new H.c7(!0,P.cx(null,P.E)).aO(z)},null,null,2,0,null,20]}},
fA:{"^":"k;a6:a>,b,c,jg:d<,it:e<,f,r,jb:x?,dG:y<,iD:z<,Q,ch,cx,cy,db,dx",
eM:function(a,b){if(!this.f.S(0,a))return
if(this.Q.F(0,b)&&!this.y)this.y=!0
this.di()},
jw:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ad(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.b(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.b(v,w)
v[w]=x
if(w===y.c)y.en();++y.d}this.y=!1}this.di()},
ia:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.r(a),y=0;x=this.ch,y<x.length;y+=2)if(z.S(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.b(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jv:function(a){var z,y,x
if(this.ch==null)return
for(z=J.r(a),y=0;x=this.ch,y<x.length;y+=2)if(z.S(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.F(new P.z("removeRange"))
P.fd(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
fP:function(a,b){if(!this.r.S(0,a))return
this.db=b},
j1:function(a,b,c){var z=J.r(b)
if(!z.S(b,0))z=z.S(b,1)&&!this.cy
else z=!0
if(z){J.ce(a,c)
return}z=this.cx
if(z==null){z=P.eW(null,null)
this.cx=z}z.b1(0,new H.up(a,c))},
j0:function(a,b){var z
if(!this.r.S(0,a))return
z=J.r(b)
if(!z.S(b,0))z=z.S(b,1)&&!this.cy
else z=!0
if(z){this.dH()
return}z=this.cx
if(z==null){z=P.eW(null,null)
this.cx=z}z.b1(0,this.gjh())},
j2:function(a,b){var z,y
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cD(a)
if(b!=null)P.cD(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aU(a)
y[1]=b==null?null:J.aU(b)
for(z=H.l(new P.bX(z,z.r,null,null),[null]),z.c=z.a.e;z.l();)J.ce(z.d,y)},
c0:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.a3(u)
w=t
v=H.aB(u)
this.j2(w,v)
if(this.db===!0){this.dH()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjg()
if(this.cx!=null)for(;t=this.cx,!t.gR(t);)this.cx.fp().$0()}return y},
iZ:function(a){var z=J.N(a)
switch(z.h(a,0)){case"pause":this.eM(z.h(a,1),z.h(a,2))
break
case"resume":this.jw(z.h(a,1))
break
case"add-ondone":this.ia(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.jv(z.h(a,1))
break
case"set-errors-fatal":this.fP(z.h(a,1),z.h(a,2))
break
case"ping":this.j1(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.j0(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.F(0,z.h(a,1))
break
case"stopErrors":this.dx.ad(0,z.h(a,1))
break}},
dJ:function(a){return this.b.h(0,a)},
ed:function(a,b){var z=this.b
if(z.H(0,a))throw H.c(P.dC("Registry: ports must be registered only once."))
z.i(0,a,b)},
di:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.i(0,this.a,this)
else this.dH()},
dH:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aF(0)
for(z=this.b,y=z.ga_(z),y=y.gA(y);y.l();)y.gp().hu()
z.aF(0)
this.c.aF(0)
init.globalState.z.ad(0,this.a)
this.dx.aF(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.b(z,v)
J.ce(w,z[v])}this.ch=null}},"$0","gjh",0,0,6]},
up:{"^":"a:6;a,b",
$0:[function(){J.ce(this.a,this.b)},null,null,0,0,null,"call"]},
u2:{"^":"k;a,b",
iE:function(){var z=this.a
if(z.b===z.c)return
return z.fp()},
fv:function(){var z,y,x
z=this.iE()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.H(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gR(y)}else y=!1
else y=!1
else y=!1
if(y)H.F(P.dC("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gR(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.c7(!0,H.l(new P.ln(0,null,null,null,null,null,0),[null,P.E])).aO(x)
y.toString
self.postMessage(x)}return!1}z.js()
return!0},
eD:function(){if(self.window!=null)new H.u3(this).$0()
else for(;this.fv(););},
cb:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eD()
else try{this.eD()}catch(x){w=H.a3(x)
z=w
y=H.aB(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.e(z)+"\n"+H.e(y)])
v=new H.c7(!0,P.cx(null,P.E)).aO(v)
w.toString
self.postMessage(v)}}},
u3:{"^":"a:6;a",
$0:function(){if(!this.a.fv())return
P.tB(C.w,this)}},
dd:{"^":"k;a,b,c",
js:function(){var z=this.a
if(z.gdG()){z.giD().push(this)
return}z.c0(this.b)}},
ux:{"^":"k;"},
pc:{"^":"a:3;a,b,c,d,e,f",
$0:function(){H.pd(this.a,this.b,this.c,this.d,this.e,this.f)}},
pe:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.sjb(!0)
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.cB()
w=H.bY(x,[x,x]).bf(y)
if(w)y.$2(this.b,this.c)
else{x=H.bY(x,[x]).bf(y)
if(x)y.$1(this.b)
else y.$0()}}z.di()}},
ld:{"^":"k;"},
e1:{"^":"ld;b,a",
bl:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.ges())return
x=H.v6(b)
if(z.git()===y){z.iZ(x)
return}y=init.globalState.f
w="receive "+H.e(b)
y.a.b1(0,new H.dd(z,new H.uB(this,x),w))},
S:function(a,b){if(b==null)return!1
return b instanceof H.e1&&J.y(this.b,b.b)},
gah:function(a){return this.b.gda()}},
uB:{"^":"a:3;a,b",
$0:function(){var z=this.a.b
if(!z.ges())J.m4(z,this.b)}},
fB:{"^":"ld;b,c,a",
bl:function(a,b){var z,y,x
z=P.ae(["command","message","port",this,"msg",b])
y=new H.c7(!0,P.cx(null,P.E)).aO(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
S:function(a,b){if(b==null)return!1
return b instanceof H.fB&&J.y(this.b,b.b)&&J.y(this.a,b.a)&&J.y(this.c,b.c)},
gah:function(a){var z,y,x
z=J.fY(this.b,16)
y=J.fY(this.a,8)
x=this.c
if(typeof x!=="number")return H.C(x)
return(z^y^x)>>>0}},
dT:{"^":"k;da:a<,b,es:c<",
hu:function(){this.c=!0
this.b=null},
ht:function(a,b){if(this.c)return
this.hN(b)},
hN:function(a){return this.b.$1(a)},
$isrp:1},
tx:{"^":"k;a,b,c",
ho:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.b1(0,new H.dd(y,new H.tz(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.b2(new H.tA(this,b),0),a)}else throw H.c(new P.z("Timer greater than 0."))},
C:{
ty:function(a,b){var z=new H.tx(!0,!1,null)
z.ho(a,b)
return z}}},
tz:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
tA:{"^":"a:6;a,b",
$0:[function(){this.a.c=null;--init.globalState.f.b
this.b.$0()},null,null,0,0,null,"call"]},
c1:{"^":"k;da:a<",
gah:function(a){var z,y,x
z=this.a
y=J.Y(z)
x=y.e6(z,0)
y=y.bz(z,4294967296)
if(typeof y!=="number")return H.C(y)
z=x^y
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.c1){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
c7:{"^":"k;a,b",
aO:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.i(0,a,z.gk(z))
z=J.r(a)
if(!!z.$isf2)return["buffer",a]
if(!!z.$isd4)return["typed",a]
if(!!z.$isO)return this.fL(a)
if(!!z.$isp9){x=this.gfI()
w=z.gI(a)
w=H.bJ(w,x,H.ag(w,"h",0),null)
w=P.b8(w,!0,H.ag(w,"h",0))
z=z.ga_(a)
z=H.bJ(z,x,H.ag(z,"h",0),null)
return["map",w,P.b8(z,!0,H.ag(z,"h",0))]}if(!!z.$isj0)return this.fM(a)
if(!!z.$isj)this.fA(a)
if(!!z.$isrp)this.cf(a,"RawReceivePorts can't be transmitted:")
if(!!z.$ise1)return this.fN(a)
if(!!z.$isfB)return this.fO(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cf(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isc1)return["capability",a.a]
if(!(a instanceof P.k))this.fA(a)
return["dart",init.classIdExtractor(a),this.fK(init.classFieldsExtractor(a))]},"$1","gfI",2,0,2,7],
cf:function(a,b){throw H.c(new P.z(H.e(b==null?"Can't transmit:":b)+" "+H.e(a)))},
fA:function(a){return this.cf(a,null)},
fL:function(a){var z=this.fJ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cf(a,"Can't serialize indexable: ")},
fJ:function(a){var z,y,x
z=[]
C.e.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.aO(a[y])
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
fK:function(a){var z
for(z=0;z<a.length;++z)C.e.i(a,z,this.aO(a[z]))
return a},
fM:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cf(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.e.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.aO(a[z[x]])
if(x>=y.length)return H.b(y,x)
y[x]=w}return["js-object",z,y]},
fO:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fN:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gda()]
return["raw sendport",a]}},
e_:{"^":"k;a,b",
bt:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.b3("Bad serialized message: "+H.e(a)))
switch(C.e.gP(a)){case"ref":if(1>=a.length)return H.b(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.b(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=H.l(this.bY(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return H.l(this.bY(x),[null])
case"mutable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return this.bY(x)
case"const":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=H.l(this.bY(x),[null])
y.fixed$length=Array
return y
case"map":return this.iH(a)
case"sendport":return this.iI(a)
case"raw sendport":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iG(a)
case"function":if(1>=a.length)return H.b(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.b(a,1)
return new H.c1(a[1])
case"dart":y=a.length
if(1>=y)return H.b(a,1)
w=a[1]
if(2>=y)return H.b(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.bY(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.e(a))}},"$1","giF",2,0,2,7],
bY:function(a){var z,y,x
z=J.N(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.C(x)
if(!(y<x))break
z.i(a,y,this.bt(z.h(a,y)));++y}return a},
iH:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w=P.as()
this.b.push(w)
y=J.he(y,this.giF()).cc(0)
for(z=J.N(y),v=J.N(x),u=0;u<z.gk(y);++u)w.i(0,z.h(y,u),this.bt(v.h(x,u)))
return w},
iI:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
if(3>=z)return H.b(a,3)
w=a[3]
if(J.y(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dJ(w)
if(u==null)return
t=new H.e1(u,x)}else t=new H.fB(y,w,x)
this.b.push(t)
return t},
iG:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.N(y)
v=J.N(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.C(t)
if(!(u<t))break
w[z.h(y,u)]=this.bt(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
mU:function(){throw H.c(new P.z("Cannot modify unmodifiable Map"))},
lR:function(a){return init.getTypeFromName(a)},
wJ:function(a){return init.types[a]},
lQ:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.r(a).$isQ},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aU(a)
if(typeof z!=="string")throw H.c(H.I(a))
return z},
bO:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
fa:function(a,b){if(b==null)throw H.c(new P.dK(a,null,null))
return b.$1(a)},
a1:function(a,b,c){var z,y,x,w,v,u
H.b1(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.fa(a,c)
if(3>=z.length)return H.b(z,3)
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.fa(a,c)}if(b<2||b>36)throw H.c(P.ao(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.f.aC(w,u)|32)>x)return H.fa(a,c)}return parseInt(a,b)},
ju:function(a,b){if(b==null)throw H.c(new P.dK("Invalid double",a,null))
return b.$1(a)},
af:function(a,b){var z,y
H.b1(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.ju(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.cG(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.ju(a,b)}return z},
d6:function(a){var z,y,x,w,v,u,t,s
z=J.r(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.J||!!J.r(a).$iscw){v=C.z(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.f.aC(w,0)===36)w=C.f.bc(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.e9(H.e7(a),0,null),init.mangledGlobalNames)},
dR:function(a){return"Instance of '"+H.d6(a)+"'"},
rn:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.dh(z,10))>>>0,56320|z&1023)}throw H.c(P.ao(a,0,1114111,null,null))},
aE:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fb:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.I(a))
return a[b]},
jy:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.I(a))
a[b]=c},
jv:function(a,b,c){var z,y,x
z={}
z.a=0
y=[]
x=[]
z.a=b.length
C.e.av(y,b)
z.b=""
if(c!=null&&!c.gR(c))c.V(0,new H.rm(z,y,x))
return J.ml(a,new H.pl(C.W,""+"$"+z.a+z.b,0,y,x,null))},
rl:function(a,b){var z,y
z=b instanceof Array?b:P.b8(b,!0,null)
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3){if(!!a.$3)return a.$3(z[0],z[1],z[2])}else if(y===4){if(!!a.$4)return a.$4(z[0],z[1],z[2],z[3])}else if(y===5)if(!!a.$5)return a.$5(z[0],z[1],z[2],z[3],z[4])
return H.rk(a,z)},
rk:function(a,b){var z,y,x,w,v,u
z=b.length
y=a[""+"$"+z]
if(y==null){y=J.r(a)["call*"]
if(y==null)return H.jv(a,b,null)
x=H.jB(y)
w=x.d
v=w+x.e
if(x.f||w>z||v<z)return H.jv(a,b,null)
b=P.b8(b,!0,null)
for(u=z;u<v;++u)C.e.F(b,init.metadata[x.iC(0,u)])}return y.apply(a,b)},
C:function(a){throw H.c(H.I(a))},
b:function(a,b){if(a==null)J.al(a)
throw H.c(H.at(a,b))},
at:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.bi(!0,b,"index",null)
z=J.al(a)
if(!(b<0)){if(typeof z!=="number")return H.C(z)
y=b>=z}else y=!0
if(y)return P.a4(b,a,"index",null,z)
return P.c4(b,"index",null)},
wG:function(a,b,c){if(a>c)return new P.dS(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.dS(a,c,!0,b,"end","Invalid value")
return new P.bi(!0,b,"end",null)},
I:function(a){return new P.bi(!0,a,null,null)},
P:function(a){if(typeof a!=="number")throw H.c(H.I(a))
return a},
dg:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.I(a))
return a},
b1:function(a){if(typeof a!=="string")throw H.c(H.I(a))
return a},
c:function(a){var z
if(a==null)a=new P.dO()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.m0})
z.name=""}else z.toString=H.m0
return z},
m0:[function(){return J.aU(this.dartException)},null,null,0,0,null],
F:function(a){throw H.c(a)},
x:function(a){throw H.c(new P.ar(a))},
a3:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.xJ(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.dh(x,16)&8191)===10)switch(w){case 438:return z.$1(H.eU(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.e(y)+" (Error "+w+")"
return z.$1(new H.jf(v,null))}}if(a instanceof TypeError){u=$.$get$kX()
t=$.$get$kY()
s=$.$get$kZ()
r=$.$get$l_()
q=$.$get$l3()
p=$.$get$l4()
o=$.$get$l1()
$.$get$l0()
n=$.$get$l6()
m=$.$get$l5()
l=u.aV(y)
if(l!=null)return z.$1(H.eU(y,l))
else{l=t.aV(y)
if(l!=null){l.method="call"
return z.$1(H.eU(y,l))}else{l=s.aV(y)
if(l==null){l=r.aV(y)
if(l==null){l=q.aV(y)
if(l==null){l=p.aV(y)
if(l==null){l=o.aV(y)
if(l==null){l=r.aV(y)
if(l==null){l=n.aV(y)
if(l==null){l=m.aV(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.jf(y,l==null?null:l.method))}}return z.$1(new H.tE(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.kP()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.bi(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.kP()
return a},
aB:function(a){var z
if(a==null)return new H.lp(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.lp(a,null)},
eb:function(a){if(a==null||typeof a!='object')return J.bg(a)
else return H.bO(a)},
wI:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
wT:[function(a,b,c,d,e,f,g){switch(c){case 0:return H.de(b,new H.wU(a))
case 1:return H.de(b,new H.wV(a,d))
case 2:return H.de(b,new H.wW(a,d,e))
case 3:return H.de(b,new H.wX(a,d,e,f))
case 4:return H.de(b,new H.wY(a,d,e,f,g))}throw H.c(P.dC("Unsupported number of arguments for wrapped closure"))},null,null,14,0,null,18,23,25,27,28,34,35],
b2:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.wT)
a.$identity=z
return z},
mG:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.r(c).$isi){z.$reflectionInfo=c
x=H.jB(z).r}else x=c
w=d?Object.create(new H.ta().constructor.prototype):Object.create(new H.et(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.bj
$.bj=J.G(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.hp(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.wJ,x)
else if(u&&typeof x=="function"){q=t?H.hm:H.eu
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.hp(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
mD:function(a,b,c,d){var z=H.eu
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
hp:function(a,b,c){var z,y,x,w,v,u
if(c)return H.mF(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.mD(y,!w,z,b)
if(y===0){w=$.cg
if(w==null){w=H.du("self")
$.cg=w}w="return function(){return this."+H.e(w)+"."+H.e(z)+"();"
v=$.bj
$.bj=J.G(v,1)
return new Function(w+H.e(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.cg
if(v==null){v=H.du("self")
$.cg=v}v=w+H.e(v)+"."+H.e(z)+"("+u+");"
w=$.bj
$.bj=J.G(w,1)
return new Function(v+H.e(w)+"}")()},
mE:function(a,b,c,d){var z,y
z=H.eu
y=H.hm
switch(b?-1:a){case 0:throw H.c(new H.rF("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
mF:function(a,b){var z,y,x,w,v,u,t,s
z=H.mA()
y=$.hl
if(y==null){y=H.du("receiver")
$.hl=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.mE(w,!u,x,b)
if(w===1){y="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
u=$.bj
$.bj=J.G(u,1)
return new Function(y+H.e(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
u=$.bj
$.bj=J.G(u,1)
return new Function(y+H.e(u)+"}")()},
fK:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.r(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.mG(a,b,z,!!d,e,f)},
fM:function(a){if(typeof a==="number"||a==null)return a
throw H.c(H.ew(H.d6(a),"double"))},
xD:function(a,b){var z=J.N(b)
throw H.c(H.ew(H.d6(a),z.bd(b,3,z.gk(b))))},
q:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.r(a)[b]
else z=!0
if(z)return a
H.xD(a,b)},
xI:function(a){throw H.c(new P.nf("Cyclic initialization for static "+H.e(a)))},
bY:function(a,b,c){return new H.rG(a,b,c,null)},
lK:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.rI(z)
return new H.rH(z,b,null)},
cB:function(){return C.C},
ec:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
lN:function(a){return init.getIsolateTag(a)},
av:function(a){return new H.da(a,null)},
l:function(a,b){a.$builtinTypeInfo=b
return a},
e7:function(a){if(a==null)return
return a.$builtinTypeInfo},
lO:function(a,b){return H.fU(a["$as"+H.e(b)],H.e7(a))},
ag:function(a,b,c){var z=H.lO(a,b)
return z==null?null:z[c]},
ah:function(a,b){var z=H.e7(a)
return z==null?null:z[b]},
fS:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.e9(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.v(a)
else return},
e9:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bn("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.e(H.fS(u,c))}return w?"":"<"+H.e(z)+">"},
fN:function(a){var z=J.r(a).constructor.builtin$cls
if(a==null)return z
return z+H.e9(a.$builtinTypeInfo,0,null)},
fU:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
vq:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.e7(a)
y=J.r(a)
if(y[b]==null)return!1
return H.lI(H.fU(y[d],z),c)},
xH:function(a,b,c,d){if(a!=null&&!H.vq(a,b,c,d))throw H.c(H.ew(H.d6(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.e9(c,0,null),init.mangledGlobalNames)))
return a},
lI:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aQ(a[y],b[y]))return!1
return!0},
dh:function(a,b,c){return a.apply(b,H.lO(b,c))},
aQ:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.lP(a,b)
if('func' in a)return b.builtin$cls==="dL"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.fS(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.e(H.fS(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.lI(H.fU(v,z),x)},
lH:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.aQ(z,v)||H.aQ(v,z)))return!1}return!0},
vm:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.aQ(v,u)||H.aQ(u,v)))return!1}return!0},
lP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.aQ(z,y)||H.aQ(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.lH(x,w,!1))return!1
if(!H.lH(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.aQ(o,n)||H.aQ(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.aQ(o,n)||H.aQ(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.aQ(o,n)||H.aQ(n,o)))return!1}}return H.vm(a.named,b.named)},
BQ:function(a){var z=$.fO
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
BM:function(a){return H.bO(a)},
BL:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
x1:function(a){var z,y,x,w,v,u
z=$.fO.$1(a)
y=$.e5[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.e8[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.lG.$2(a,z)
if(z!=null){y=$.e5[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.e8[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.fQ(x)
$.e5[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.e8[z]=x
return x}if(v==="-"){u=H.fQ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.lV(a,x)
if(v==="*")throw H.c(new P.db(z))
if(init.leafTags[z]===true){u=H.fQ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.lV(a,x)},
lV:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.ea(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
fQ:function(a){return J.ea(a,!1,null,!!a.$isQ)},
xC:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.ea(z,!1,null,!!z.$isQ)
else return J.ea(z,c,null,null)},
wR:function(){if(!0===$.fP)return
$.fP=!0
H.wS()},
wS:function(){var z,y,x,w,v,u,t,s
$.e5=Object.create(null)
$.e8=Object.create(null)
H.wN()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.lW.$1(v)
if(u!=null){t=H.xC(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
wN:function(){var z,y,x,w,v,u,t
z=C.K()
z=H.ca(C.L,H.ca(C.M,H.ca(C.y,H.ca(C.y,H.ca(C.O,H.ca(C.N,H.ca(C.P(C.z),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.fO=new H.wO(v)
$.lG=new H.wP(u)
$.lW=new H.wQ(t)},
ca:function(a,b){return a(b)||b},
xG:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.fZ(b,C.f.bc(a,c))
return!z.gR(z)}},
ed:function(a,b,c){var z,y,x
H.b1(c)
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
BK:[function(a){return a},"$1","vd",2,0,38],
aJ:function(a,b,c,d){var z,y,x,w,v,u
d=H.vd()
z=J.r(b)
if(!z.$isf9)throw H.c(P.ds(b,"pattern","is not a Pattern"))
y=new P.bn("")
for(z=z.dl(b,a),z=new H.la(z.a,z.b,z.c,null),x=0;z.l();){w=z.d
v=w.b
y.a+=H.e(d.$1(C.f.bd(a,x,v.index)))
y.a+=H.e(c.$1(w))
u=v.index
if(0>=v.length)return H.b(v,0)
v=J.al(v[0])
if(typeof v!=="number")return H.C(v)
x=u+v}z=y.a+=H.e(d.$1(C.f.bc(a,x)))
return z.charCodeAt(0)==0?z:z},
mT:{"^":"l7;a",$asl7:I.aI,$asj7:I.aI,$asB:I.aI,$isB:1},
mS:{"^":"k;",
gR:function(a){return this.gk(this)===0},
v:function(a){return P.eX(this)},
i:function(a,b,c){return H.mU()},
$isB:1,
$asB:null},
mV:{"^":"mS;a,b,c",
gk:function(a){return this.a},
H:function(a,b){if(typeof b!=="string")return!1
if("__proto__"===b)return!1
return this.b.hasOwnProperty(b)},
h:function(a,b){if(!this.H(0,b))return
return this.d8(b)},
d8:function(a){return this.b[a]},
V:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.d8(w))}},
gI:function(a){return H.l(new H.tW(this),[H.ah(this,0)])},
ga_:function(a){return H.bJ(this.c,new H.mW(this),H.ah(this,0),H.ah(this,1))}},
mW:{"^":"a:2;a",
$1:[function(a){return this.a.d8(a)},null,null,2,0,null,4,"call"]},
tW:{"^":"h;a",
gA:function(a){var z=this.a.c
return H.l(new J.cH(z,z.length,0,null),[H.ah(z,0)])},
gk:function(a){return this.a.c.length}},
pl:{"^":"k;a,b,c,d,e,f",
gfi:function(){return this.a},
gfo:function(){var z,y,x,w
if(this.c===1)return C.r
z=this.d
y=z.length-this.e.length
if(y===0)return C.r
x=[]
for(w=0;w<y;++w){if(w>=z.length)return H.b(z,w)
x.push(z[w])}x.fixed$length=Array
x.immutable$list=Array
return x},
gfk:function(){var z,y,x,w,v,u,t,s
if(this.c!==0)return C.B
z=this.e
y=z.length
x=this.d
w=x.length-y
if(y===0)return C.B
v=H.l(new H.a2(0,null,null,null,null,null,0),[P.cu,null])
for(u=0;u<y;++u){if(u>=z.length)return H.b(z,u)
t=z[u]
s=w+u
if(s<0||s>=x.length)return H.b(x,s)
v.i(0,new H.fl(t),x[s])}return H.l(new H.mT(v),[P.cu,null])}},
rq:{"^":"k;a,b,c,d,e,f,r,x",
iC:function(a,b){var z=this.d
if(typeof b!=="number")return b.aN()
if(b<z)return
return this.b[3+b-z]},
C:{
jB:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.rq(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
rm:{"^":"a:10;a,b,c",
$2:function(a,b){var z=this.a
z.b=z.b+"$"+H.e(a)
this.c.push(a)
this.b.push(b);++z.a}},
tC:{"^":"k;a,b,c,d,e,f",
aV:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
C:{
bo:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.tC(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
dZ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
l2:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
jf:{"^":"aw;a,b",
v:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+H.e(z)+"' on null"}},
ps:{"^":"aw;a,b,c",
v:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.e(z)+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.e(z)+"' on '"+H.e(y)+"' ("+H.e(this.a)+")"},
C:{
eU:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ps(a,y,z?null:b.receiver)}}},
tE:{"^":"aw;a",
v:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
xJ:{"^":"a:2;a",
$1:function(a){if(!!J.r(a).$isaw)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
lp:{"^":"k;a,b",
v:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
wU:{"^":"a:3;a",
$0:function(){return this.a.$0()}},
wV:{"^":"a:3;a,b",
$0:function(){return this.a.$1(this.b)}},
wW:{"^":"a:3;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
wX:{"^":"a:3;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
wY:{"^":"a:3;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"k;",
v:function(a){return"Closure '"+H.d6(this)+"'"},
gfE:function(){return this},
$isdL:1,
gfE:function(){return this}},
kT:{"^":"a;"},
ta:{"^":"kT;",
v:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
et:{"^":"kT;a,b,c,d",
S:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.et))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gah:function(a){var z,y
z=this.c
if(z==null)y=H.bO(this.a)
else y=typeof z!=="object"?J.bg(z):H.bO(z)
return J.m2(y,H.bO(this.b))},
v:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+H.dR(z)},
C:{
eu:function(a){return a.a},
hm:function(a){return a.c},
mA:function(){var z=$.cg
if(z==null){z=H.du("self")
$.cg=z}return z},
du:function(a){var z,y,x,w,v
z=new H.et("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
mB:{"^":"aw;a",
v:function(a){return this.a},
C:{
ew:function(a,b){return new H.mB("CastError: Casting value of type "+H.e(a)+" to incompatible type "+H.e(b))}}},
rF:{"^":"aw;a",
v:function(a){return"RuntimeError: "+H.e(this.a)}},
dV:{"^":"k;"},
rG:{"^":"dV;a,b,c,d",
bf:function(a){var z=this.hH(a)
return z==null?!1:H.lP(z,this.b7())},
hH:function(a){var z=J.r(a)
return"$signature" in z?z.$signature():null},
b7:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.r(y)
if(!!x.$isBe)z.v=true
else if(!x.$ishz)z.ret=y.b7()
y=this.b
if(y!=null&&y.length!==0)z.args=H.jC(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.jC(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.lL(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].b7()}z.named=w}return z},
v:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.e(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.e(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.lL(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.e(z[s].b7())+" "+s}x+="}"}}return x+(") -> "+H.e(this.a))},
C:{
jC:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].b7())
return z}}},
hz:{"^":"dV;",
v:function(a){return"dynamic"},
b7:function(){return}},
rI:{"^":"dV;a",
b7:function(){var z,y
z=this.a
y=H.lR(z)
if(y==null)throw H.c("no type for '"+z+"'")
return y},
v:function(a){return this.a}},
rH:{"^":"dV;a,b,c",
b7:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.lR(z)]
if(0>=y.length)return H.b(y,0)
if(y[0]==null)throw H.c("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.x)(z),++w)y.push(z[w].b7())
this.c=y
return y},
v:function(a){var z=this.b
return this.a+"<"+(z&&C.e).c6(z,", ")+">"}},
da:{"^":"k;a,b",
v:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gah:function(a){return J.bg(this.a)},
S:function(a,b){if(b==null)return!1
return b instanceof H.da&&J.y(this.a,b.a)}},
a2:{"^":"k;a,b,c,d,e,f,r",
gk:function(a){return this.a},
gR:function(a){return this.a===0},
gff:function(a){return!this.gR(this)},
gI:function(a){return H.l(new H.py(this),[H.ah(this,0)])},
ga_:function(a){return H.bJ(this.gI(this),new H.pr(this),H.ah(this,0),H.ah(this,1))},
H:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.el(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.el(y,b)}else return this.jd(b)},
jd:function(a){var z=this.d
if(z==null)return!1
return this.c5(this.cp(z,this.c4(a)),a)>=0},
is:function(a,b){return this.gI(this).cr(0,new H.pq(this,b))},
av:function(a,b){b.V(0,new H.pp(this))},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bR(z,b)
return y==null?null:y.gbu()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.bR(x,b)
return y==null?null:y.gbu()}else return this.je(b)},
je:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cp(z,this.c4(a))
x=this.c5(y,a)
if(x<0)return
return y[x].gbu()},
i:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.dd()
this.b=z}this.ec(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dd()
this.c=y}this.ec(y,b,c)}else{x=this.d
if(x==null){x=this.dd()
this.d=x}w=this.c4(b)
v=this.cp(x,w)
if(v==null)this.dg(x,w,[this.de(b,c)])
else{u=this.c5(v,b)
if(u>=0)v[u].sbu(c)
else v.push(this.de(b,c))}}},
ad:function(a,b){if(typeof b==="string")return this.eB(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eB(this.c,b)
else return this.jf(b)},
jf:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cp(z,this.c4(a))
x=this.c5(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eH(w)
return w.gbu()},
aF:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
V:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.ar(this))
z=z.c}},
ec:function(a,b,c){var z=this.bR(a,b)
if(z==null)this.dg(a,b,this.de(b,c))
else z.sbu(c)},
eB:function(a,b){var z
if(a==null)return
z=this.bR(a,b)
if(z==null)return
this.eH(z)
this.em(a,b)
return z.gbu()},
de:function(a,b){var z,y
z=H.l(new H.px(a,b,null,null),[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eH:function(a){var z,y
z=a.ghV()
y=a.ghv()
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
c4:function(a){return J.bg(a)&0x3ffffff},
c5:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.y(a[y].gfc(),b))return y
return-1},
v:function(a){return P.eX(this)},
bR:function(a,b){return a[b]},
cp:function(a,b){return a[b]},
dg:function(a,b,c){a[b]=c},
em:function(a,b){delete a[b]},
el:function(a,b){return this.bR(a,b)!=null},
dd:function(){var z=Object.create(null)
this.dg(z,"<non-identifier-key>",z)
this.em(z,"<non-identifier-key>")
return z},
$isp9:1,
$isB:1,
$asB:null,
C:{
j4:function(a,b){return H.l(new H.a2(0,null,null,null,null,null,0),[a,b])}}},
pr:{"^":"a:2;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,10,"call"]},
pq:{"^":"a:2;a,b",
$1:function(a){return J.y(this.a.h(0,a),this.b)}},
pp:{"^":"a;a",
$2:function(a,b){this.a.i(0,a,b)},
$signature:function(){return H.dh(function(a,b){return{func:1,args:[a,b]}},this.a,"a2")}},
px:{"^":"k;fc:a<,bu:b@,hv:c<,hV:d<"},
py:{"^":"h;a",
gk:function(a){return this.a.a},
gR:function(a){return this.a.a===0},
gA:function(a){var z,y
z=this.a
y=new H.pz(z,z.r,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.c=z.e
return y},
M:function(a,b){return this.a.H(0,b)},
V:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.ar(z))
y=y.c}},
$iso:1},
pz:{"^":"k;a,b,c,d",
gp:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.ar(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
wO:{"^":"a:2;a",
$1:function(a){return this.a(a)}},
wP:{"^":"a:22;a",
$2:function(a,b){return this.a(a,b)}},
wQ:{"^":"a:8;a",
$1:function(a){return this.a(a)}},
j2:{"^":"k;a,hU:b<,c,d",
v:function(a){return"RegExp/"+this.a+"/"},
ghT:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.eS(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
geu:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.eS(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dm:function(a,b,c){H.b1(b)
H.dg(c)
if(c>b.length)throw H.c(P.ao(c,0,b.length,null,null))
return new H.tL(this,b,c)},
dl:function(a,b){return this.dm(a,b,0)},
hG:function(a,b){var z,y
z=this.ghT()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.lo(this,y)},
hF:function(a,b){var z,y,x,w
z=this.geu()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
x=y.length
w=x-1
if(w<0)return H.b(y,w)
if(y[w]!=null)return
C.e.sk(y,w)
return new H.lo(this,y)},
dK:function(a,b,c){if(c<0||c>b.length)throw H.c(P.ao(c,0,b.length,null,null))
return this.hF(b,c)},
$isrr:1,
$isf9:1,
C:{
eS:function(a,b,c,d){var z,y,x,w
H.b1(a)
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.dK("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
lo:{"^":"k;a,b",
ge7:function(a){return this.b.index},
gf4:function(a){var z,y
z=this.b
y=z.index
if(0>=z.length)return H.b(z,0)
z=J.al(z[0])
if(typeof z!=="number")return H.C(z)
return y+z},
a0:function(a){var z=this.b
if(a>>>0!==a||a>=z.length)return H.b(z,a)
return z[a]},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.b(z,b)
return z[b]},
gcM:function(){return this.b.length-1}},
tL:{"^":"iX;a,b,c",
gA:function(a){return new H.la(this.a,this.b,this.c,null)},
$asiX:function(){return[P.d3]},
$ash:function(){return[P.d3]}},
la:{"^":"k;a,b,c,d",
gp:function(){return this.d},
l:function(){var z,y,x,w,v
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hG(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
if(0>=z.length)return H.b(z,0)
w=J.al(z[0])
if(typeof w!=="number")return H.C(w)
v=y+w
this.c=z.index===v?v+1:v
return!0}}this.d=null
this.b=null
return!1}},
fk:{"^":"k;e7:a>,b,c",
gf4:function(a){return this.a+this.c.length},
h:function(a,b){return this.a0(b)},
gcM:function(){return 0},
a0:function(a){if(!J.y(a,0))throw H.c(P.c4(a,null,null))
return this.c}},
uO:{"^":"h;a,b,c",
gA:function(a){return new H.uP(this.a,this.b,this.c,null)},
gP:function(a){var z,y,x
z=this.a
y=this.b
x=z.indexOf(y,this.c)
if(x>=0)return new H.fk(x,z,y)
throw H.c(H.aD())},
$ash:function(){return[P.d3]}},
uP:{"^":"k;a,b,c,d",
l:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.fk(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gp:function(){return this.d}}}],["","",,H,{"^":"",
aD:function(){return new P.A("No element")},
pj:function(){return new P.A("Too many elements")},
pi:function(){return new P.A("Too few elements")},
d7:function(a,b,c,d){if(c-b<=32)H.kO(a,b,c,d)
else H.kN(a,b,c,d)},
kO:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.N(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a6(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
kN:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.au(c-b+1,6)
y=b+z
x=c-z
w=C.c.au(b+c,2)
v=w-z
u=w+z
t=J.N(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a6(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a6(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a6(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a6(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a6(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a6(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a6(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a6(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a6(d.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.y(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.r(i)
if(h.S(i,0))continue
if(h.aN(i,0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.Y(i)
if(h.ak(i,0)){--l
continue}else{g=l-1
if(h.aN(i,0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
l=g
m=f
break}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.bq(d.$2(j,r),0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(J.a6(d.$2(j,p),0))for(;!0;)if(J.a6(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bq(d.$2(t.h(a,l),r),0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=f}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=g
break}}e=!1}h=m-1
t.i(a,b,t.h(a,h))
t.i(a,h,r)
h=l+1
t.i(a,c,t.h(a,h))
t.i(a,h,p)
H.d7(a,b,m-2,d)
H.d7(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.y(d.$2(t.h(a,m),r),0);)++m
for(;J.y(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.y(d.$2(j,r),0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(J.y(d.$2(j,p),0))for(;!0;)if(J.y(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bq(d.$2(t.h(a,l),r),0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=f}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=g
break}}H.d7(a,m,l,d)}else H.d7(a,m,l,d)},
bI:{"^":"h;",
gA:function(a){return H.l(new H.j6(this,this.gk(this),0,null),[H.ag(this,"bI",0)])},
V:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.N(0,y))
if(z!==this.gk(this))throw H.c(new P.ar(this))}},
gR:function(a){return this.gk(this)===0},
gP:function(a){if(this.gk(this)===0)throw H.c(H.aD())
return this.N(0,0)},
gU:function(a){if(this.gk(this)===0)throw H.c(H.aD())
return this.N(0,this.gk(this)-1)},
M:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(J.y(this.N(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.ar(this))}return!1},
bK:function(a,b){return this.h_(this,b)},
bk:function(a,b){return H.l(new H.cs(this,b),[H.ag(this,"bI",0),null])},
cd:function(a,b){var z,y,x
z=H.l([],[H.ag(this,"bI",0)])
C.e.sk(z,this.gk(this))
for(y=0;y<this.gk(this);++y){x=this.N(0,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
cc:function(a){return this.cd(a,!0)},
$iso:1},
j6:{"^":"k;a,b,c,d",
gp:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.N(z)
x=y.gk(z)
if(this.b!==x)throw H.c(new P.ar(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.N(z,w);++this.c
return!0}},
j8:{"^":"h;a,b",
gA:function(a){var z=new H.pB(null,J.a5(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gk:function(a){return J.al(this.a)},
gR:function(a){return J.dl(this.a)},
gP:function(a){return this.aJ(J.h5(this.a))},
gU:function(a){return this.aJ(J.h7(this.a))},
N:function(a,b){return this.aJ(J.dj(this.a,b))},
aJ:function(a){return this.b.$1(a)},
$ash:function(a,b){return[b]},
C:{
bJ:function(a,b,c,d){if(!!J.r(a).$iso)return H.l(new H.ez(a,b),[c,d])
return H.l(new H.j8(a,b),[c,d])}}},
ez:{"^":"j8;a,b",$iso:1},
pB:{"^":"cZ;a,b,c",
l:function(){var z=this.b
if(z.l()){this.a=this.aJ(z.gp())
return!0}this.a=null
return!1},
gp:function(){return this.a},
aJ:function(a){return this.c.$1(a)},
$ascZ:function(a,b){return[b]}},
cs:{"^":"bI;a,b",
gk:function(a){return J.al(this.a)},
N:function(a,b){return this.aJ(J.dj(this.a,b))},
aJ:function(a){return this.b.$1(a)},
$asbI:function(a,b){return[b]},
$ash:function(a,b){return[b]},
$iso:1},
l9:{"^":"h;a,b",
gA:function(a){var z=new H.tH(J.a5(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
tH:{"^":"cZ;a,b",
l:function(){for(var z=this.a;z.l();)if(this.aJ(z.gp())===!0)return!0
return!1},
gp:function(){return this.a.gp()},
aJ:function(a){return this.b.$1(a)}},
kS:{"^":"h;a,b",
gA:function(a){var z=new H.tw(J.a5(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
C:{
tv:function(a,b,c){if(b<0)throw H.c(P.b3(b))
if(!!J.r(a).$iso)return H.l(new H.nt(a,b),[c])
return H.l(new H.kS(a,b),[c])}}},
nt:{"^":"kS;a,b",
gk:function(a){var z,y
z=J.al(this.a)
y=this.b
if(z>y)return y
return z},
$iso:1},
tw:{"^":"cZ;a,b",
l:function(){if(--this.b>=0)return this.a.l()
this.b=-1
return!1},
gp:function(){if(this.b<0)return
return this.a.gp()}},
kM:{"^":"h;a,b",
gA:function(a){var z=new H.t7(J.a5(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
eb:function(a,b,c){var z=this.b
if(z<0)H.F(P.ao(z,0,null,"count",null))},
C:{
t6:function(a,b,c){var z
if(!!J.r(a).$iso){z=H.l(new H.ns(a,b),[c])
z.eb(a,b,c)
return z}return H.t5(a,b,c)},
t5:function(a,b,c){var z=H.l(new H.kM(a,b),[c])
z.eb(a,b,c)
return z}}},
ns:{"^":"kM;a,b",
gk:function(a){var z=J.al(this.a)-this.b
if(z>=0)return z
return 0},
$iso:1},
t7:{"^":"cZ;a,b",
l:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.l()
this.b=0
return z.l()},
gp:function(){return this.a.gp()}},
iR:{"^":"k;",
sk:function(a,b){throw H.c(new P.z("Cannot change the length of a fixed-length list"))},
F:function(a,b){throw H.c(new P.z("Cannot add to a fixed-length list"))}},
fl:{"^":"k;hS:a<",
S:function(a,b){if(b==null)return!1
return b instanceof H.fl&&J.y(this.a,b.a)},
gah:function(a){var z=J.bg(this.a)
if(typeof z!=="number")return H.C(z)
return 536870911&664597*z},
v:function(a){return'Symbol("'+H.e(this.a)+'")'}}}],["","",,H,{"^":"",
lL:function(a){var z=H.l(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
tM:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.vn()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.b2(new P.tO(z),1)).observe(y,{childList:true})
return new P.tN(z,y,x)}else if(self.setImmediate!=null)return P.vo()
return P.vp()},
Bj:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.b2(new P.tP(a),0))},"$1","vn",2,0,14],
Bk:[function(a){++init.globalState.f.b
self.setImmediate(H.b2(new P.tQ(a),0))},"$1","vo",2,0,14],
Bl:[function(a){P.fn(C.w,a)},"$1","vp",2,0,14],
vb:function(a,b,c){var z=H.cB()
z=H.bY(z,[z,z]).bf(a)
if(z)return a.$2(b,c)
else return a.$1(b)},
lA:function(a,b){var z=H.cB()
z=H.bY(z,[z,z]).bf(a)
if(z){b.toString
return a}else{b.toString
return a}},
iS:function(a,b,c){var z
a=a!=null?a:new P.dO()
z=$.M
if(z!==C.h)z.toString
z=H.l(new P.aO(0,z,null),[c])
z.ee(a,b)
return z},
ve:function(){var z,y
for(;z=$.c8,z!=null;){$.cz=null
y=J.h9(z)
$.c8=y
if(y==null)$.cy=null
z.geS().$0()}},
BJ:[function(){$.fG=!0
try{P.ve()}finally{$.cz=null
$.fG=!1
if($.c8!=null)$.$get$fr().$1(P.lJ())}},"$0","lJ",0,0,6],
lF:function(a){var z=new P.lb(a,null)
if($.c8==null){$.cy=z
$.c8=z
if(!$.fG)$.$get$fr().$1(P.lJ())}else{$.cy.b=z
$.cy=z}},
vh:function(a){var z,y,x
z=$.c8
if(z==null){P.lF(a)
$.cz=$.cy
return}y=new P.lb(a,null)
x=$.cz
if(x==null){y.b=z
$.cz=y
$.c8=y}else{y.b=x.b
x.b=y
$.cz=y
if(y.b==null)$.cy=y}},
lZ:function(a){var z=$.M
if(C.h===z){P.c9(null,null,C.h,a)
return}z.toString
P.c9(null,null,z,z.dq(a,!0))},
lE:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.a3(u)
z=t
y=H.aB(u)
$.M.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.cd(x)
w=t
v=x.gba()
c.$2(w,v)}}},
v1:function(a,b,c,d){var z=a.cs(0)
if(!!J.r(z).$isb7)z.cL(new P.v3(b,c,d))
else b.aQ(c,d)},
lt:function(a,b){return new P.v2(a,b)},
lu:function(a,b,c){var z=a.cs(0)
if(!!J.r(z).$isb7)z.cL(new P.v4(b,c))
else b.b2(c)},
ls:function(a,b,c){$.M.toString
a.bO(b,c)},
tB:function(a,b){var z=$.M
if(z===C.h){z.toString
return P.fn(a,b)}return P.fn(a,z.dq(b,!0))},
fn:function(a,b){var z=C.c.au(a.a,1000)
return H.ty(z<0?0:z,b)},
df:function(a,b,c,d,e){var z={}
z.a=d
P.vh(new P.vg(z,e))},
lB:function(a,b,c,d){var z,y
y=$.M
if(y===c)return d.$0()
$.M=c
z=y
try{y=d.$0()
return y}finally{$.M=z}},
lD:function(a,b,c,d,e){var z,y
y=$.M
if(y===c)return d.$1(e)
$.M=c
z=y
try{y=d.$1(e)
return y}finally{$.M=z}},
lC:function(a,b,c,d,e,f){var z,y
y=$.M
if(y===c)return d.$2(e,f)
$.M=c
z=y
try{y=d.$2(e,f)
return y}finally{$.M=z}},
c9:function(a,b,c,d){var z=C.h!==c
if(z)d=c.dq(d,!(!z||!1))
P.lF(d)},
tO:{"^":"a:2;a",
$1:[function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()},null,null,2,0,null,8,"call"]},
tN:{"^":"a:23;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
tP:{"^":"a:3;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
tQ:{"^":"a:3;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
b7:{"^":"k;"},
lf:{"^":"k;",
ip:[function(a,b){a=a!=null?a:new P.dO()
if(this.a.a!==0)throw H.c(new P.A("Future already completed"))
$.M.toString
this.aQ(a,b)},function(a){return this.ip(a,null)},"eX","$2","$1","gio",2,2,24,3,5,9]},
lc:{"^":"lf;a",
eW:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.A("Future already completed"))
z.hw(b)},
im:function(a){return this.eW(a,null)},
aQ:function(a,b){this.a.ee(a,b)}},
uU:{"^":"lf;a",
aQ:function(a,b){this.a.aQ(a,b)}},
li:{"^":"k;bg:a@,ae:b>,c,eS:d<,e",
gbC:function(){return this.b.b},
gf9:function(){return(this.c&1)!==0},
gj5:function(){return(this.c&2)!==0},
gf8:function(){return this.c===8},
gj8:function(){return this.e!=null},
j3:function(a){return this.b.b.dT(this.d,a)},
ji:function(a){if(this.c!==6)return!0
return this.b.b.dT(this.d,J.cd(a))},
f7:function(a){var z,y,x,w
z=this.e
y=H.cB()
y=H.bY(y,[y,y]).bf(z)
x=J.f(a)
w=this.b
if(y)return w.b.jE(z,x.gaL(a),a.gba())
else return w.b.dT(z,x.gaL(a))},
j4:function(){return this.b.b.ft(this.d)}},
aO:{"^":"k;bp:a<,bC:b<,bB:c<",
ghQ:function(){return this.a===2},
gdc:function(){return this.a>=4},
ghO:function(){return this.a===8},
i3:function(a){this.a=2
this.c=a},
fw:function(a,b){var z,y
z=$.M
if(z!==C.h){z.toString
if(b!=null)b=P.lA(b,z)}y=H.l(new P.aO(0,$.M,null),[null])
this.d_(H.l(new P.li(null,y,b==null?1:3,a,b),[null,null]))
return y},
jH:function(a){return this.fw(a,null)},
cL:function(a){var z,y
z=$.M
y=new P.aO(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.h)z.toString
this.d_(H.l(new P.li(null,y,8,a,null),[null,null]))
return y},
i5:function(){this.a=1},
hy:function(){this.a=0},
gbn:function(){return this.c},
ghx:function(){return this.c},
i6:function(a){this.a=4
this.c=a},
i4:function(a){this.a=8
this.c=a},
ef:function(a){this.a=a.gbp()
this.c=a.gbB()},
d_:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdc()){y.d_(a)
return}this.a=y.gbp()
this.c=y.gbB()}z=this.b
z.toString
P.c9(null,null,z,new P.u6(this,a))}},
eA:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbg()!=null;)w=w.gbg()
w.sbg(x)}}else{if(y===2){v=this.c
if(!v.gdc()){v.eA(a)
return}this.a=v.gbp()
this.c=v.gbB()}z.a=this.eC(a)
y=this.b
y.toString
P.c9(null,null,y,new P.ue(z,this))}},
bA:function(){var z=this.c
this.c=null
return this.eC(z)},
eC:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbg()
z.sbg(y)}return y},
b2:function(a){var z
if(!!J.r(a).$isb7)P.e0(a,this)
else{z=this.bA()
this.a=4
this.c=a
P.c6(this,z)}},
aQ:[function(a,b){var z=this.bA()
this.a=8
this.c=new P.dt(a,b)
P.c6(this,z)},function(a){return this.aQ(a,null)},"jO","$2","$1","gbP",2,2,25,3,5,9],
hw:function(a){var z
if(!!J.r(a).$isb7){if(a.a===8){this.a=1
z=this.b
z.toString
P.c9(null,null,z,new P.u8(this,a))}else P.e0(a,this)
return}this.a=1
z=this.b
z.toString
P.c9(null,null,z,new P.u9(this,a))},
ee:function(a,b){var z
this.a=1
z=this.b
z.toString
P.c9(null,null,z,new P.u7(this,a,b))},
$isb7:1,
C:{
ua:function(a,b){var z,y,x,w
b.i5()
try{a.fw(new P.ub(b),new P.uc(b))}catch(x){w=H.a3(x)
z=w
y=H.aB(x)
P.lZ(new P.ud(b,z,y))}},
e0:function(a,b){var z
for(;a.ghQ();)a=a.ghx()
if(a.gdc()){z=b.bA()
b.ef(a)
P.c6(b,z)}else{z=b.gbB()
b.i3(a)
a.eA(z)}},
c6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z={}
z.a=a
for(y=a;!0;){x={}
w=y.ghO()
if(b==null){if(w){v=z.a.gbn()
y=z.a.gbC()
x=J.cd(v)
u=v.gba()
y.toString
P.df(null,null,y,x,u)}return}for(;b.gbg()!=null;b=t){t=b.gbg()
b.sbg(null)
P.c6(z.a,b)}s=z.a.gbB()
x.a=w
x.b=s
y=!w
if(!y||b.gf9()||b.gf8()){r=b.gbC()
if(w){u=z.a.gbC()
u.toString
u=u==null?r==null:u===r
if(!u)r.toString
else u=!0
u=!u}else u=!1
if(u){v=z.a.gbn()
y=z.a.gbC()
x=J.cd(v)
u=v.gba()
y.toString
P.df(null,null,y,x,u)
return}q=$.M
if(q==null?r!=null:q!==r)$.M=r
else q=null
if(b.gf8())new P.uh(z,x,w,b).$0()
else if(y){if(b.gf9())new P.ug(x,b,s).$0()}else if(b.gj5())new P.uf(z,x,b).$0()
if(q!=null)$.M=q
y=x.b
u=J.r(y)
if(!!u.$isb7){p=J.ek(b)
if(!!u.$isaO)if(y.a>=4){b=p.bA()
p.ef(y)
z.a=y
continue}else P.e0(y,p)
else P.ua(y,p)
return}}p=J.ek(b)
b=p.bA()
y=x.a
x=x.b
if(!y)p.i6(x)
else p.i4(x)
z.a=p
y=p}}}},
u6:{"^":"a:3;a,b",
$0:function(){P.c6(this.a,this.b)}},
ue:{"^":"a:3;a,b",
$0:function(){P.c6(this.b,this.a.a)}},
ub:{"^":"a:2;a",
$1:[function(a){var z=this.a
z.hy()
z.b2(a)},null,null,2,0,null,1,"call"]},
uc:{"^":"a:26;a",
$2:[function(a,b){this.a.aQ(a,b)},function(a){return this.$2(a,null)},"$1",null,null,null,2,2,null,3,5,9,"call"]},
ud:{"^":"a:3;a,b,c",
$0:[function(){this.a.aQ(this.b,this.c)},null,null,0,0,null,"call"]},
u8:{"^":"a:3;a,b",
$0:function(){P.e0(this.b,this.a)}},
u9:{"^":"a:3;a,b",
$0:function(){var z,y
z=this.a
y=z.bA()
z.a=4
z.c=this.b
P.c6(z,y)}},
u7:{"^":"a:3;a,b,c",
$0:function(){this.a.aQ(this.b,this.c)}},
uh:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.j4()}catch(w){v=H.a3(w)
y=v
x=H.aB(w)
if(this.c){v=J.cd(this.a.a.gbn())
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.gbn()
else u.b=new P.dt(y,x)
u.a=!0
return}if(!!J.r(z).$isb7){if(z instanceof P.aO&&z.gbp()>=4){if(z.gbp()===8){v=this.b
v.b=z.gbB()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.jH(new P.ui(t))
v.a=!1}}},
ui:{"^":"a:2;a",
$1:[function(a){return this.a},null,null,2,0,null,8,"call"]},
ug:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.j3(this.c)}catch(x){w=H.a3(x)
z=w
y=H.aB(x)
w=this.a
w.b=new P.dt(z,y)
w.a=!0}}},
uf:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.gbn()
w=this.c
if(w.ji(z)===!0&&w.gj8()){v=this.b
v.b=w.f7(z)
v.a=!1}}catch(u){w=H.a3(u)
y=w
x=H.aB(u)
w=this.a
v=J.cd(w.a.gbn())
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.gbn()
else s.b=new P.dt(y,x)
s.a=!0}}},
lb:{"^":"k;eS:a<,bv:b*"},
bb:{"^":"k;",
bk:function(a,b){return H.l(new P.uA(b,this),[H.ag(this,"bb",0),null])},
j_:function(a,b){return H.l(new P.uj(a,b,this),[H.ag(this,"bb",0)])},
f7:function(a){return this.j_(a,null)},
M:function(a,b){var z,y
z={}
y=H.l(new P.aO(0,$.M,null),[P.bc])
z.a=null
z.a=this.bj(new P.tg(z,this,b,y),!0,new P.th(y),y.gbP())
return y},
V:function(a,b){var z,y
z={}
y=H.l(new P.aO(0,$.M,null),[null])
z.a=null
z.a=this.bj(new P.tk(z,this,b,y),!0,new P.tl(y),y.gbP())
return y},
gk:function(a){var z,y
z={}
y=H.l(new P.aO(0,$.M,null),[P.E])
z.a=0
this.bj(new P.to(z),!0,new P.tp(z,y),y.gbP())
return y},
gR:function(a){var z,y
z={}
y=H.l(new P.aO(0,$.M,null),[P.bc])
z.a=null
z.a=this.bj(new P.tm(z,y),!0,new P.tn(y),y.gbP())
return y},
cc:function(a){var z,y
z=H.l([],[H.ag(this,"bb",0)])
y=H.l(new P.aO(0,$.M,null),[[P.i,H.ag(this,"bb",0)]])
this.bj(new P.tq(this,z),!0,new P.tr(z,y),y.gbP())
return y}},
tg:{"^":"a;a,b,c,d",
$1:[function(a){var z,y
z=this.a
y=this.d
P.lE(new P.te(this.c,a),new P.tf(z,y),P.lt(z.a,y))},null,null,2,0,null,6,"call"],
$signature:function(){return H.dh(function(a){return{func:1,args:[a]}},this.b,"bb")}},
te:{"^":"a:3;a,b",
$0:function(){return J.y(this.b,this.a)}},
tf:{"^":"a:27;a,b",
$1:function(a){if(a===!0)P.lu(this.a.a,this.b,!0)}},
th:{"^":"a:3;a",
$0:[function(){this.a.b2(!1)},null,null,0,0,null,"call"]},
tk:{"^":"a;a,b,c,d",
$1:[function(a){P.lE(new P.ti(this.c,a),new P.tj(),P.lt(this.a.a,this.d))},null,null,2,0,null,6,"call"],
$signature:function(){return H.dh(function(a){return{func:1,args:[a]}},this.b,"bb")}},
ti:{"^":"a:3;a,b",
$0:function(){return this.a.$1(this.b)}},
tj:{"^":"a:2;",
$1:function(a){}},
tl:{"^":"a:3;a",
$0:[function(){this.a.b2(null)},null,null,0,0,null,"call"]},
to:{"^":"a:2;a",
$1:[function(a){++this.a.a},null,null,2,0,null,8,"call"]},
tp:{"^":"a:3;a,b",
$0:[function(){this.b.b2(this.a.a)},null,null,0,0,null,"call"]},
tm:{"^":"a:2;a,b",
$1:[function(a){P.lu(this.a.a,this.b,!1)},null,null,2,0,null,8,"call"]},
tn:{"^":"a:3;a",
$0:[function(){this.a.b2(!0)},null,null,0,0,null,"call"]},
tq:{"^":"a;a,b",
$1:[function(a){this.b.push(a)},null,null,2,0,null,15,"call"],
$signature:function(){return H.dh(function(a){return{func:1,args:[a]}},this.a,"bb")}},
tr:{"^":"a:3;a,b",
$0:[function(){this.b.b2(this.a)},null,null,0,0,null,"call"]},
td:{"^":"k;"},
Bs:{"^":"k;"},
le:{"^":"k;bC:d<,bp:e<",
dM:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.eT()
if((z&4)===0&&(this.e&32)===0)this.eo(this.gew())},
fn:function(a){return this.dM(a,null)},
fq:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gR(z)}else z=!1
if(z)this.r.cO(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.eo(this.gey())}}}},
cs:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.d2()
return this.f},
gdG:function(){return this.e>=128},
d2:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.eT()
if((this.e&32)===0)this.r=null
this.f=this.ev()},
d1:["h3",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.eE(b)
else this.d0(H.l(new P.tY(b,null),[null]))}],
bO:["h4",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.eG(a,b)
else this.d0(new P.u_(a,b,null))}],
hz:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.eF()
else this.d0(C.F)},
ex:[function(){},"$0","gew",0,0,6],
ez:[function(){},"$0","gey",0,0,6],
ev:function(){return},
d0:function(a){var z,y
z=this.r
if(z==null){z=H.l(new P.uN(null,null,0),[null])
this.r=z}z.F(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cO(this)}},
eE:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.dU(this.a,a)
this.e=(this.e&4294967263)>>>0
this.d3((z&4)!==0)},
eG:function(a,b){var z,y
z=this.e
y=new P.tU(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.d2()
z=this.f
if(!!J.r(z).$isb7)z.cL(y)
else y.$0()}else{y.$0()
this.d3((z&4)!==0)}},
eF:function(){var z,y
z=new P.tT(this)
this.d2()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.r(y).$isb7)y.cL(z)
else z.$0()},
eo:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.d3((z&4)!==0)},
d3:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gR(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gR(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ex()
else this.ez()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cO(this)},
hp:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.lA(b,z)
this.c=c}},
tU:{"^":"a:6;a,b,c",
$0:[function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bY(H.cB(),[H.lK(P.k),H.lK(P.bv)]).bf(y)
w=z.d
v=this.b
u=z.b
if(x)w.jF(u,v,this.c)
else w.dU(u,v)
z.e=(z.e&4294967263)>>>0},null,null,0,0,null,"call"]},
tT:{"^":"a:6;a",
$0:[function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fu(z.c)
z.e=(z.e&4294967263)>>>0},null,null,0,0,null,"call"]},
fu:{"^":"k;bv:a*"},
tY:{"^":"fu;G:b>,a",
dN:function(a){a.eE(this.b)}},
u_:{"^":"fu;aL:b>,ba:c<,a",
dN:function(a){a.eG(this.b,this.c)},
$asfu:I.aI},
tZ:{"^":"k;",
dN:function(a){a.eF()},
gbv:function(a){return},
sbv:function(a,b){throw H.c(new P.A("No events after a done."))}},
uC:{"^":"k;bp:a<",
cO:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.lZ(new P.uD(this,a))
this.a=1},
eT:function(){if(this.a===1)this.a=3}},
uD:{"^":"a:3;a,b",
$0:[function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=J.h9(x)
z.b=w
if(w==null)z.c=null
x.dN(this.b)},null,null,0,0,null,"call"]},
uN:{"^":"uC;b,c,a",
gR:function(a){return this.c==null},
F:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{J.mr(z,b)
this.c=b}}},
v3:{"^":"a:3;a,b,c",
$0:[function(){return this.a.aQ(this.b,this.c)},null,null,0,0,null,"call"]},
v2:{"^":"a:28;a,b",
$2:function(a,b){P.v1(this.a,this.b,a,b)}},
v4:{"^":"a:3;a,b",
$0:[function(){return this.a.b2(this.b)},null,null,0,0,null,"call"]},
dc:{"^":"bb;",
bj:function(a,b,c,d){return this.hD(a,d,c,!0===b)},
fh:function(a,b,c){return this.bj(a,null,b,c)},
hD:function(a,b,c,d){return P.u5(this,a,b,c,d,H.ag(this,"dc",0),H.ag(this,"dc",1))},
ep:function(a,b){b.d1(0,a)},
eq:function(a,b,c){c.bO(a,b)},
$asbb:function(a,b){return[b]}},
lh:{"^":"le;x,y,a,b,c,d,e,f,r",
d1:function(a,b){if((this.e&2)!==0)return
this.h3(this,b)},
bO:function(a,b){if((this.e&2)!==0)return
this.h4(a,b)},
ex:[function(){var z=this.y
if(z==null)return
z.fn(0)},"$0","gew",0,0,6],
ez:[function(){var z=this.y
if(z==null)return
z.fq(0)},"$0","gey",0,0,6],
ev:function(){var z=this.y
if(z!=null){this.y=null
return z.cs(0)}return},
jP:[function(a){this.x.ep(a,this)},"$1","ghK",2,0,function(){return H.dh(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"lh")},15],
jR:[function(a,b){this.x.eq(a,b,this)},"$2","ghM",4,0,29,5,9],
jQ:[function(){this.hz()},"$0","ghL",0,0,6],
hq:function(a,b,c,d,e,f,g){var z,y
z=this.ghK()
y=this.ghM()
this.y=this.x.a.fh(z,this.ghL(),y)},
$asle:function(a,b){return[b]},
C:{
u5:function(a,b,c,d,e,f,g){var z=$.M
z=H.l(new P.lh(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.hp(b,c,d,e,g)
z.hq(a,b,c,d,e,f,g)
return z}}},
uA:{"^":"dc;b,a",
ep:function(a,b){var z,y,x,w,v
z=null
try{z=this.i8(a)}catch(w){v=H.a3(w)
y=v
x=H.aB(w)
P.ls(b,y,x)
return}J.m5(b,z)},
i8:function(a){return this.b.$1(a)}},
uj:{"^":"dc;b,c,a",
eq:function(a,b,c){var z,y,x,w,v,u
z=!0
if(z===!0)try{P.vb(this.b,a,b)}catch(w){v=H.a3(w)
y=v
x=H.aB(w)
v=y
u=a
if(v==null?u==null:v===u)c.bO(a,b)
else P.ls(c,y,x)
return}else c.bO(a,b)},
$asdc:function(a){return[a,a]},
$asbb:null},
dt:{"^":"k;aL:a>,ba:b<",
v:function(a){return H.e(this.a)},
$isaw:1},
v_:{"^":"k;"},
vg:{"^":"a:3;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dO()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.aU(y)
throw x}},
uF:{"^":"v_;",
gaA:function(a){return},
fu:function(a){var z,y,x,w
try{if(C.h===$.M){x=a.$0()
return x}x=P.lB(null,null,this,a)
return x}catch(w){x=H.a3(w)
z=x
y=H.aB(w)
return P.df(null,null,this,z,y)}},
dU:function(a,b){var z,y,x,w
try{if(C.h===$.M){x=a.$1(b)
return x}x=P.lD(null,null,this,a,b)
return x}catch(w){x=H.a3(w)
z=x
y=H.aB(w)
return P.df(null,null,this,z,y)}},
jF:function(a,b,c){var z,y,x,w
try{if(C.h===$.M){x=a.$2(b,c)
return x}x=P.lC(null,null,this,a,b,c)
return x}catch(w){x=H.a3(w)
z=x
y=H.aB(w)
return P.df(null,null,this,z,y)}},
dq:function(a,b){if(b)return new P.uG(this,a)
else return new P.uH(this,a)},
ih:function(a,b){return new P.uI(this,a)},
h:function(a,b){return},
ft:function(a){if($.M===C.h)return a.$0()
return P.lB(null,null,this,a)},
dT:function(a,b){if($.M===C.h)return a.$1(b)
return P.lD(null,null,this,a,b)},
jE:function(a,b,c){if($.M===C.h)return a.$2(b,c)
return P.lC(null,null,this,a,b,c)}},
uG:{"^":"a:3;a,b",
$0:function(){return this.a.fu(this.b)}},
uH:{"^":"a:3;a,b",
$0:function(){return this.a.ft(this.b)}},
uI:{"^":"a:2;a,b",
$1:[function(a){return this.a.dU(this.b,a)},null,null,2,0,null,26,"call"]}}],["","",,P,{"^":"",
fx:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
fw:function(){var z=Object.create(null)
P.fx(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z},
as:function(){return H.l(new H.a2(0,null,null,null,null,null,0),[null,null])},
ae:function(a){return H.wI(a,H.l(new H.a2(0,null,null,null,null,null,0),[null,null]))},
ph:function(a,b,c){var z,y
if(P.fH(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$cA()
y.push(a)
try{P.vc(a,z)}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=P.kQ(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
dN:function(a,b,c){var z,y,x
if(P.fH(a))return b+"..."+c
z=new P.bn(b)
y=$.$get$cA()
y.push(a)
try{x=z
x.saR(P.kQ(x.gaR(),a,", "))}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=z
y.saR(y.gaR()+c)
y=z.gaR()
return y.charCodeAt(0)==0?y:y},
fH:function(a){var z,y
for(z=0;y=$.$get$cA(),z<y.length;++z)if(a===y[z])return!0
return!1},
vc:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.l())return
w=H.e(z.gp())
b.push(w)
y+=w.length+2;++x}if(!z.l()){if(x<=5)return
if(0>=b.length)return H.b(b,-1)
v=b.pop()
if(0>=b.length)return H.b(b,-1)
u=b.pop()}else{t=z.gp();++x
if(!z.l()){if(x<=4){b.push(H.e(t))
return}v=H.e(t)
if(0>=b.length)return H.b(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gp();++x
for(;z.l();t=s,s=r){r=z.gp();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.e(t)
v=H.e(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ab:function(a,b,c,d){return H.l(new P.ut(0,null,null,null,null,null,0),[d])},
j5:function(a,b){var z,y,x
z=P.ab(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.x)(a),++x)z.F(0,a[x])
return z},
eX:function(a){var z,y,x
z={}
if(P.fH(a))return"{...}"
y=new P.bn("")
try{$.$get$cA().push(a)
x=y
x.saR(x.gaR()+"{")
z.a=!0
J.cc(a,new P.pC(z,y))
z=y
z.saR(z.gaR()+"}")}finally{z=$.$get$cA()
if(0>=z.length)return H.b(z,-1)
z.pop()}z=y.gaR()
return z.charCodeAt(0)==0?z:z},
uk:{"^":"k;",
gk:function(a){return this.a},
gR:function(a){return this.a===0},
gI:function(a){return H.l(new P.lj(this),[H.ah(this,0)])},
ga_:function(a){return H.bJ(H.l(new P.lj(this),[H.ah(this,0)]),new P.um(this),H.ah(this,0),H.ah(this,1))},
H:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
return z==null?!1:z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
return y==null?!1:y[b]!=null}else return this.hC(b)},
hC:function(a){var z=this.d
if(z==null)return!1
return this.be(z[H.eb(a)&0x3ffffff],a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.hJ(0,b)},
hJ:function(a,b){var z,y,x
z=this.d
if(z==null)return
y=z[H.eb(b)&0x3ffffff]
x=this.be(y,b)
return x<0?null:y[x+1]},
i:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.fw()
this.b=z}this.eh(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.fw()
this.c=y}this.eh(y,b,c)}else{x=this.d
if(x==null){x=P.fw()
this.d=x}w=H.eb(b)&0x3ffffff
v=x[w]
if(v==null){P.fx(x,w,[b,c]);++this.a
this.e=null}else{u=this.be(v,b)
if(u>=0)v[u+1]=c
else{v.push(b,c);++this.a
this.e=null}}}},
V:function(a,b){var z,y,x,w
z=this.d4()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.h(0,w))
if(z!==this.e)throw H.c(new P.ar(this))}},
d4:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.e
if(z!=null)return z
y=new Array(this.a)
y.fixed$length=Array
x=this.b
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.c
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.d
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.e=y
return y},
eh:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.fx(a,b,c)},
$isB:1,
$asB:null},
um:{"^":"a:2;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,10,"call"]},
uo:{"^":"uk;a,b,c,d,e",
be:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2){x=a[y]
if(x==null?b==null:x===b)return y}return-1}},
lj:{"^":"h;a",
gk:function(a){return this.a.a},
gR:function(a){return this.a.a===0},
gA:function(a){var z=this.a
z=new P.ul(z,z.d4(),0,null)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
M:function(a,b){return this.a.H(0,b)},
V:function(a,b){var z,y,x,w
z=this.a
y=z.d4()
for(x=y.length,w=0;w<x;++w){b.$1(y[w])
if(y!==z.e)throw H.c(new P.ar(z))}},
$iso:1},
ul:{"^":"k;a,b,c,d",
gp:function(){return this.d},
l:function(){var z,y,x
z=this.b
y=this.c
x=this.a
if(z!==x.e)throw H.c(new P.ar(x))
else if(y>=z.length){this.d=null
return!1}else{this.d=z[y]
this.c=y+1
return!0}}},
ln:{"^":"a2;a,b,c,d,e,f,r",
c4:function(a){return H.eb(a)&0x3ffffff},
c5:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfc()
if(x==null?b==null:x===b)return y}return-1},
C:{
cx:function(a,b){return H.l(new P.ln(0,null,null,null,null,null,0),[a,b])}}},
ut:{"^":"un;a,b,c,d,e,f,r",
gA:function(a){var z=H.l(new P.bX(this,this.r,null,null),[null])
z.c=z.a.e
return z},
gk:function(a){return this.a},
gR:function(a){return this.a===0},
M:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hB(b)},
hB:function(a){var z=this.d
if(z==null)return!1
return this.be(z[this.co(a)],a)>=0},
dJ:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.M(0,a)?a:null
else return this.hR(a)},
hR:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.co(a)]
x=this.be(y,a)
if(x<0)return
return J.ad(y,x).gbQ()},
V:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.gbQ())
if(y!==this.r)throw H.c(new P.ar(this))
z=z.gdf()}},
gP:function(a){var z=this.e
if(z==null)throw H.c(new P.A("No elements"))
return z.gbQ()},
gU:function(a){var z=this.f
if(z==null)throw H.c(new P.A("No elements"))
return z.a},
F:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.eg(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eg(x,b)}else return this.b1(0,b)},
b1:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.uv()
this.d=z}y=this.co(b)
x=z[y]
if(x==null)z[y]=[this.d5(b)]
else{if(this.be(x,b)>=0)return!1
x.push(this.d5(b))}return!0},
ad:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ej(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ej(this.c,b)
else return this.hA(0,b)},
hA:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.co(b)]
x=this.be(y,b)
if(x<0)return!1
this.ek(y.splice(x,1)[0])
return!0},
aF:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eg:function(a,b){if(a[b]!=null)return!1
a[b]=this.d5(b)
return!0},
ej:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ek(z)
delete a[b]
return!0},
d5:function(a){var z,y
z=new P.uu(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ek:function(a){var z,y
z=a.gei()
y=a.gdf()
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.sei(z);--this.a
this.r=this.r+1&67108863},
co:function(a){return J.bg(a)&0x3ffffff},
be:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.y(a[y].gbQ(),b))return y
return-1},
$iso:1,
$ish:1,
$ash:null,
C:{
uv:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
uu:{"^":"k;bQ:a<,df:b<,ei:c@"},
bX:{"^":"k;a,b,c,d",
gp:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.ar(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.gbQ()
this.c=this.c.gdf()
return!0}}}},
un:{"^":"rM;"},
iX:{"^":"h;"},
cr:{"^":"dP;"},
dP:{"^":"k+Z;",$isi:1,$asi:null,$iso:1,$ish:1,$ash:null},
Z:{"^":"k;",
gA:function(a){return H.l(new H.j6(a,this.gk(a),0,null),[H.ag(a,"Z",0)])},
N:function(a,b){return this.h(a,b)},
V:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gk(a))throw H.c(new P.ar(a))}},
gR:function(a){return this.gk(a)===0},
gP:function(a){if(this.gk(a)===0)throw H.c(H.aD())
return this.h(a,0)},
gU:function(a){if(this.gk(a)===0)throw H.c(H.aD())
return this.h(a,this.gk(a)-1)},
M:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<this.gk(a);++y){if(J.y(this.h(a,y),b))return!0
if(z!==this.gk(a))throw H.c(new P.ar(a))}return!1},
bK:function(a,b){return H.l(new H.l9(a,b),[H.ag(a,"Z",0)])},
bk:function(a,b){return H.l(new H.cs(a,b),[null,null])},
cd:function(a,b){var z,y,x
z=H.l([],[H.ag(a,"Z",0)])
C.e.sk(z,this.gk(a))
for(y=0;y<this.gk(a);++y){x=this.h(a,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
cc:function(a){return this.cd(a,!0)},
F:function(a,b){var z=this.gk(a)
this.sk(a,z+1)
this.i(a,z,b)},
c3:function(a,b,c){var z
if(c>=this.gk(a))return-1
for(z=c;z<this.gk(a);++z)if(J.y(this.h(a,z),b))return z
return-1},
bI:function(a,b){return this.c3(a,b,0)},
c7:function(a,b,c){var z
if(c.aN(0,0))return-1
if(c.bL(0,this.gk(a)))c=this.gk(a)-1
for(z=c;z>=0;--z)if(J.y(this.h(a,z),b))return z
return-1},
cF:function(a,b){return this.c7(a,b,null)},
v:function(a){return P.dN(a,"[","]")},
$isi:1,
$asi:null,
$iso:1,
$ish:1,
$ash:null},
uX:{"^":"k;",
i:function(a,b,c){throw H.c(new P.z("Cannot modify unmodifiable map"))},
$isB:1,
$asB:null},
j7:{"^":"k;",
h:function(a,b){return this.a.h(0,b)},
i:function(a,b,c){this.a.i(0,b,c)},
H:function(a,b){return this.a.H(0,b)},
V:function(a,b){this.a.V(0,b)},
gR:function(a){var z=this.a
return z.gR(z)},
gk:function(a){var z=this.a
return z.gk(z)},
gI:function(a){var z=this.a
return z.gI(z)},
v:function(a){return this.a.v(0)},
ga_:function(a){var z=this.a
return z.ga_(z)},
$isB:1,
$asB:null},
l7:{"^":"j7+uX;",$isB:1,$asB:null},
pC:{"^":"a:1;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
pA:{"^":"bI;a,b,c,d",
gA:function(a){var z=new P.uw(this,this.c,this.d,this.b,null)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
V:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.b(x,y)
b.$1(x[y])
if(z!==this.d)H.F(new P.ar(this))}},
gR:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gP:function(a){var z,y
z=this.b
if(z===this.c)throw H.c(H.aD())
y=this.a
if(z>=y.length)return H.b(y,z)
return y[z]},
gU:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.aD())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.b(z,y)
return z[y]},
N:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.C(b)
if(0>b||b>=z)H.F(P.a4(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.b(y,w)
return y[w]},
F:function(a,b){this.b1(0,b)},
aF:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.b(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
v:function(a){return P.dN(this,"{","}")},
fp:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.aD());++this.d
y=this.a
x=y.length
if(z>=x)return H.b(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
b1:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.b(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.en();++this.d},
en:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.l(z,[H.ah(this,0)])
z=this.a
x=this.b
w=z.length-x
C.e.e4(y,0,w,z,x)
C.e.e4(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
hf:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.l(z,[b])},
$iso:1,
$ash:null,
C:{
eW:function(a,b){var z=H.l(new P.pA(null,0,0,0),[b])
z.hf(a,b)
return z}}},
uw:{"^":"k;a,b,c,d,e",
gp:function(){return this.e},
l:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.F(new P.ar(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.b(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
rN:{"^":"k;",
gR:function(a){return this.a===0},
av:function(a,b){var z
for(z=J.a5(b);z.l();)this.F(0,z.gp())},
bk:function(a,b){return H.l(new H.ez(this,b),[H.ah(this,0),null])},
v:function(a){return P.dN(this,"{","}")},
V:function(a,b){var z
for(z=H.l(new P.bX(this,this.r,null,null),[null]),z.c=z.a.e;z.l();)b.$1(z.d)},
c6:function(a,b){var z,y,x
z=H.l(new P.bX(this,this.r,null,null),[null])
z.c=z.a.e
if(!z.l())return""
y=new P.bn("")
if(b===""){do y.a+=H.e(z.d)
while(z.l())}else{y.a=H.e(z.d)
for(;z.l();){y.a+=b
y.a+=H.e(z.d)}}x=y.a
return x.charCodeAt(0)==0?x:x},
gP:function(a){var z=H.l(new P.bX(this,this.r,null,null),[null])
z.c=z.a.e
if(!z.l())throw H.c(H.aD())
return z.d},
gU:function(a){var z,y
z=H.l(new P.bX(this,this.r,null,null),[null])
z.c=z.a.e
if(!z.l())throw H.c(H.aD())
do y=z.d
while(z.l())
return y},
N:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.hi("index"))
if(b<0)H.F(P.ao(b,0,null,"index",null))
for(z=H.l(new P.bX(this,this.r,null,null),[null]),z.c=z.a.e,y=0;z.l();){x=z.d
if(b===y)return x;++y}throw H.c(P.a4(b,this,"index",null,y))},
$iso:1,
$ish:1,
$ash:null},
rM:{"^":"rN;"}}],["","",,P,{"^":"",
e2:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.uq(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.e2(a[z])
return a},
vf:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.c(H.I(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.a3(w)
y=x
throw H.c(new P.dK(String(y),null,null))}return P.e2(z)},
uq:{"^":"k;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hW(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.b3().length
return z},
gR:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.b3().length
return z===0},
gff:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.b3().length
return z>0},
gI:function(a){var z
if(this.b==null){z=this.c
return z.gI(z)}return new P.ur(this)},
ga_:function(a){var z
if(this.b==null){z=this.c
return z.ga_(z)}return H.bJ(this.b3(),new P.us(this),null,null)},
i:function(a,b,c){var z,y
if(this.b==null)this.c.i(0,b,c)
else if(this.H(0,b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.eJ().i(0,b,c)},
H:function(a,b){if(this.b==null)return this.c.H(0,b)
if(typeof b!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,b)},
ad:function(a,b){if(this.b!=null&&!this.H(0,b))return
return this.eJ().ad(0,b)},
V:function(a,b){var z,y,x,w
if(this.b==null)return this.c.V(0,b)
z=this.b3()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.e2(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.ar(this))}},
v:function(a){return P.eX(this)},
b3:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
eJ:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.as()
y=this.b3()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.i(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.e.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
hW:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.e2(this.a[a])
return this.b[a]=z},
$isB:1,
$asB:I.aI},
us:{"^":"a:2;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,10,"call"]},
ur:{"^":"bI;a",
gk:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gk(z)}else z=z.b3().length
return z},
N:function(a,b){var z=this.a
if(z.b==null)z=z.gI(z).N(0,b)
else{z=z.b3()
if(b>>>0!==b||b>=z.length)return H.b(z,b)
z=z[b]}return z},
gA:function(a){var z=this.a
if(z.b==null){z=z.gI(z)
z=z.gA(z)}else{z=z.b3()
z=H.l(new J.cH(z,z.length,0,null),[H.ah(z,0)])}return z},
M:function(a,b){return this.a.H(0,b)},
$asbI:I.aI,
$ash:I.aI},
hq:{"^":"k;"},
dv:{"^":"k;"},
nu:{"^":"hq;",
$ashq:function(){return[P.t,[P.i,P.E]]}},
pw:{"^":"dv;i0:a<",
$asdv:function(){return[P.t,P.k]}},
tF:{"^":"nu;a",
gB:function(a){return"utf-8"}},
tG:{"^":"dv;",
iv:function(a,b,c){var z,y,x,w,v
z=a.length
P.fd(b,c,z,null,null,null)
y=z-b
if(y===0)return new Uint8Array(H.lv(0))
x=H.lv(y*3)
w=new Uint8Array(x)
v=new P.uY(0,0,w)
if(v.hI(a,b,z)!==z)v.eK(C.f.aC(a,z-1),0)
return new Uint8Array(w.subarray(0,H.v5(0,v.b,x)))},
iu:function(a){return this.iv(a,0,null)},
$asdv:function(){return[P.t,[P.i,P.E]]}},
uY:{"^":"k;a,b,c",
eK:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
if((b&64512)===56320){x=65536+((a&1023)<<10>>>0)|b&1023
w=y+1
this.b=w
v=z.length
if(y>=v)return H.b(z,y)
z[y]=(240|x>>>18)>>>0
y=w+1
this.b=y
if(w>=v)return H.b(z,w)
z[w]=128|x>>>12&63
w=y+1
this.b=w
if(y>=v)return H.b(z,y)
z[y]=128|x>>>6&63
this.b=w+1
if(w>=v)return H.b(z,w)
z[w]=128|x&63
return!0}else{w=y+1
this.b=w
v=z.length
if(y>=v)return H.b(z,y)
z[y]=224|a>>>12
y=w+1
this.b=y
if(w>=v)return H.b(z,w)
z[w]=128|a>>>6&63
this.b=y+1
if(y>=v)return H.b(z,y)
z[y]=128|a&63
return!1}},
hI:function(a,b,c){var z,y,x,w,v,u,t
if(b!==c&&(C.f.aC(a,c-1)&64512)===55296)--c
for(z=this.c,y=z.length,x=b;x<c;++x){w=C.f.aC(a,x)
if(w<=127){v=this.b
if(v>=y)break
this.b=v+1
z[v]=w}else if((w&64512)===55296){if(this.b+3>=y)break
u=x+1
if(this.eK(w,C.f.aC(a,u)))x=u}else if(w<=2047){v=this.b
t=v+1
if(t>=y)break
this.b=t
if(v>=y)return H.b(z,v)
z[v]=192|w>>>6
this.b=t+1
z[t]=128|w&63}else{v=this.b
if(v+2>=y)break
t=v+1
this.b=t
if(v>=y)return H.b(z,v)
z[v]=224|w>>>12
v=t+1
this.b=v
if(t>=y)return H.b(z,t)
z[t]=128|w>>>6&63
this.b=v+1
if(v>=y)return H.b(z,v)
z[v]=128|w&63}}return x}}}],["","",,P,{"^":"",
y4:[function(a,b){return J.bZ(a,b)},"$2","wC",4,0,40],
cV:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aU(a)
if(typeof a==="string")return JSON.stringify(a)
return P.nF(a)},
nF:function(a){var z=J.r(a)
if(!!z.$isa)return z.v(a)
return H.dR(a)},
dC:function(a){return new P.u4(a)},
b8:function(a,b,c){var z,y
z=H.l([],[c])
for(y=J.a5(a);y.l();)z.push(y.gp())
if(b)return z
z.fixed$length=Array
return z},
lU:function(a,b){var z,y
z=J.cG(a)
y=H.a1(z,null,P.wE())
if(y!=null)return y
y=H.af(z,P.wD())
if(y!=null)return y
return b.$1(a)},
BP:[function(a){return},"$1","wE",2,0,41],
BO:[function(a){return},"$1","wD",2,0,42],
cD:function(a){var z=H.e(a)
H.fR(z)},
au:function(a,b,c){return new H.j2(a,H.eS(a,!1,!0,!1),null,null)},
fo:function(a,b,c,d){var z,y,x,w,v,u,t
if(c===C.p&&$.$get$l8().b.test(H.b1(b)))return b
z=new P.bn("")
y=C.E.iu(b)
for(x=y.length,w=0,v="";w<x;++w){u=y[w]
if(u<128){t=u>>>4
if(t>=8)return H.b(a,t)
t=(a[t]&C.c.i7(1,u&15))!==0}else t=!1
if(t)v=z.a+=H.rn(u)
else{v+="%"
z.a=v
v+="0123456789ABCDEF"[u>>>4&15]
z.a=v
v+="0123456789ABCDEF"[u&15]
z.a=v}}return v.charCodeAt(0)==0?v:v},
qx:{"^":"a:43;a,b",
$2:function(a,b){var z,y,x
z=this.b
y=this.a
z.a+=y.a
x=z.a+=H.e(a.ghS())
z.a=x+": "
z.a+=H.e(P.cV(b))
y.a=", "}},
bc:{"^":"k;"},
"+bool":0,
az:{"^":"k;"},
c2:{"^":"k;i9:a<,b",
S:function(a,b){if(b==null)return!1
if(!(b instanceof P.c2))return!1
return this.a===b.a&&this.b===b.b},
aS:function(a,b){return C.a.aS(this.a,b.gi9())},
gah:function(a){var z=this.a
return(z^C.a.dh(z,30))&1073741823},
v:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ni(z?H.aE(this).getUTCFullYear()+0:H.aE(this).getFullYear()+0)
x=P.cL(z?H.aE(this).getUTCMonth()+1:H.aE(this).getMonth()+1)
w=P.cL(z?H.aE(this).getUTCDate()+0:H.aE(this).getDate()+0)
v=P.cL(z?H.aE(this).getUTCHours()+0:H.aE(this).getHours()+0)
u=P.cL(z?H.aE(this).getUTCMinutes()+0:H.aE(this).getMinutes()+0)
t=P.cL(z?H.aE(this).getUTCSeconds()+0:H.aE(this).getSeconds()+0)
s=P.nj(z?H.aE(this).getUTCMilliseconds()+0:H.aE(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
F:function(a,b){return P.nh(this.a+b.gja(),this.b)},
gjj:function(){return this.a},
cX:function(a,b){var z=this.a
if(!(Math.abs(z)>864e13)){if(Math.abs(z)===864e13);z=!1}else z=!0
if(z)throw H.c(P.b3(this.gjj()))},
$isaz:1,
$asaz:function(){return[P.c2]},
C:{
nh:function(a,b){var z=new P.c2(a,b)
z.cX(a,b)
return z},
ni:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.e(z)
if(z>=10)return y+"00"+H.e(z)
return y+"000"+H.e(z)},
nj:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
cL:function(a){if(a>=10)return""+a
return"0"+a}}},
aC:{"^":"aR;",$isaz:1,
$asaz:function(){return[P.aR]}},
"+double":0,
bk:{"^":"k;bm:a<",
t:function(a,b){return new P.bk(this.a+b.gbm())},
ac:function(a,b){return new P.bk(this.a-b.gbm())},
Y:function(a,b){if(typeof b!=="number")return H.C(b)
return new P.bk(C.a.cK(this.a*b))},
bz:function(a,b){if(b===0)throw H.c(new P.os())
return new P.bk(C.c.bz(this.a,b))},
aN:function(a,b){return C.c.aN(this.a,b.gbm())},
ak:function(a,b){return this.a>b.gbm()},
cN:function(a,b){return C.c.cN(this.a,b.gbm())},
bL:function(a,b){return C.c.bL(this.a,b.gbm())},
gja:function(){return C.c.au(this.a,1000)},
S:function(a,b){if(b==null)return!1
if(!(b instanceof P.bk))return!1
return this.a===b.a},
gah:function(a){return this.a&0x1FFFFFFF},
aS:function(a,b){return C.c.aS(this.a,b.gbm())},
v:function(a){var z,y,x,w,v
z=new P.nr()
y=this.a
if(y<0)return"-"+new P.bk(-y).v(0)
x=z.$1(C.c.dR(C.c.au(y,6e7),60))
w=z.$1(C.c.dR(C.c.au(y,1e6),60))
v=new P.nq().$1(C.c.dR(y,1e6))
return""+C.c.au(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
dk:function(a){return new P.bk(Math.abs(this.a))},
ci:function(a){return new P.bk(-this.a)},
$isaz:1,
$asaz:function(){return[P.bk]}},
nq:{"^":"a:18;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
nr:{"^":"a:18;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
aw:{"^":"k;",
gba:function(){return H.aB(this.$thrownJsError)}},
dO:{"^":"aw;",
v:function(a){return"Throw of null."}},
bi:{"^":"aw;a,b,B:c>,d",
gd7:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gd6:function(){return""},
v:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.e(z)+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gd7()+y+x
if(!this.a)return w
v=this.gd6()
u=P.cV(this.b)
return w+v+": "+H.e(u)},
C:{
b3:function(a){return new P.bi(!1,null,null,a)},
ds:function(a,b,c){return new P.bi(!0,a,b,c)},
hi:function(a){return new P.bi(!1,null,a,"Must not be null")}}},
dS:{"^":"bi;e,f,a,b,c,d",
gd7:function(){return"RangeError"},
gd6:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else{if(typeof x!=="number")return x.ak()
if(typeof z!=="number")return H.C(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
C:{
c4:function(a,b,c){return new P.dS(null,null,!0,a,b,"Value not in range")},
ao:function(a,b,c,d,e){return new P.dS(b,c,!0,a,d,"Invalid value")},
fd:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.ao(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.c(P.ao(b,a,c,"end",f))
return b}return c}}},
or:{"^":"bi;e,k:f>,a,b,c,d",
gd7:function(){return"RangeError"},
gd6:function(){if(J.bq(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.e(z)},
C:{
a4:function(a,b,c,d,e){var z=e!=null?e:J.al(b)
return new P.or(b,z,!0,a,c,"Index out of range")}}},
qw:{"^":"aw;a,b,c,d,e",
v:function(a){var z,y,x,w,v,u,t,s
z={}
y=new P.bn("")
z.a=""
for(x=this.c,w=x.length,v=0;v<w;++v){u=x[v]
y.a+=z.a
y.a+=H.e(P.cV(u))
z.a=", "}this.d.V(0,new P.qx(z,y))
t=P.cV(this.a)
s=H.e(y)
return"NoSuchMethodError: method not found: '"+H.e(this.b.a)+"'\nReceiver: "+H.e(t)+"\nArguments: ["+s+"]"},
C:{
jd:function(a,b,c,d,e){return new P.qw(a,b,c,d,e)}}},
z:{"^":"aw;a",
v:function(a){return"Unsupported operation: "+this.a}},
db:{"^":"aw;a",
v:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.e(z):"UnimplementedError"}},
A:{"^":"aw;a",
v:function(a){return"Bad state: "+this.a}},
ar:{"^":"aw;a",
v:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.cV(z))+"."}},
qD:{"^":"k;",
v:function(a){return"Out of Memory"},
gba:function(){return},
$isaw:1},
kP:{"^":"k;",
v:function(a){return"Stack Overflow"},
gba:function(){return},
$isaw:1},
nf:{"^":"aw;a",
v:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
u4:{"^":"k;a",
v:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.e(z)}},
dK:{"^":"k;a,b,c",
v:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.e(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
z=J.N(x)
if(J.a6(z.gk(x),78))x=z.bd(x,0,75)+"..."
return y+"\n"+H.e(x)}},
os:{"^":"k;",
v:function(a){return"IntegerDivisionByZeroException"}},
nG:{"^":"k;B:a>,b",
v:function(a){return"Expando:"+H.e(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.F(P.ds(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.fb(b,"expando$values")
return y==null?null:H.fb(y,z)},
i:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.fb(b,"expando$values")
if(y==null){y=new P.k()
H.jy(b,"expando$values",y)}H.jy(y,z,c)}}},
dL:{"^":"k;"},
E:{"^":"aR;",$isaz:1,
$asaz:function(){return[P.aR]}},
"+int":0,
h:{"^":"k;",
bk:function(a,b){return H.bJ(this,b,H.ag(this,"h",0),null)},
bK:["h_",function(a,b){return H.l(new H.l9(this,b),[H.ag(this,"h",0)])}],
M:function(a,b){var z
for(z=this.gA(this);z.l();)if(J.y(z.gp(),b))return!0
return!1},
V:function(a,b){var z
for(z=this.gA(this);z.l();)b.$1(z.gp())},
cr:function(a,b){var z
for(z=this.gA(this);z.l();)if(b.$1(z.gp())===!0)return!0
return!1},
cd:function(a,b){return P.b8(this,!0,H.ag(this,"h",0))},
cc:function(a){return this.cd(a,!0)},
gk:function(a){var z,y
z=this.gA(this)
for(y=0;z.l();)++y
return y},
gR:function(a){return!this.gA(this).l()},
gP:function(a){var z=this.gA(this)
if(!z.l())throw H.c(H.aD())
return z.gp()},
gU:function(a){var z,y
z=this.gA(this)
if(!z.l())throw H.c(H.aD())
do y=z.gp()
while(z.l())
return y},
gby:function(a){var z,y
z=this.gA(this)
if(!z.l())throw H.c(H.aD())
y=z.gp()
if(z.l())throw H.c(H.pj())
return y},
N:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.hi("index"))
if(b<0)H.F(P.ao(b,0,null,"index",null))
for(z=this.gA(this),y=0;z.l();){x=z.gp()
if(b===y)return x;++y}throw H.c(P.a4(b,this,"index",null,y))},
v:function(a){return P.ph(this,"(",")")},
$ash:null},
cZ:{"^":"k;"},
i:{"^":"k;",$asi:null,$iso:1,$ish:1,$ash:null},
"+List":0,
B:{"^":"k;",$asB:null},
qB:{"^":"k;",
v:function(a){return"null"}},
"+Null":0,
aR:{"^":"k;",$isaz:1,
$asaz:function(){return[P.aR]}},
"+num":0,
k:{"^":";",
S:function(a,b){return this===b},
gah:function(a){return H.bO(this)},
v:["h2",function(a){return H.dR(this)}],
dL:function(a,b){throw H.c(P.jd(this,b.gfi(),b.gfo(),b.gfk(),null))},
gaf:function(a){return new H.da(H.fN(this),null)},
toString:function(){return this.v(this)}},
d3:{"^":"k;"},
rL:{"^":"h;",$iso:1},
bv:{"^":"k;"},
t:{"^":"k;",$isaz:1,
$asaz:function(){return[P.t]},
$isf9:1},
"+String":0,
bn:{"^":"k;aR:a@",
gk:function(a){return this.a.length},
gR:function(a){return this.a.length===0},
v:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
C:{
kQ:function(a,b,c){var z=J.a5(b)
if(!z.l())return a
if(c.length===0){do a+=H.e(z.gp())
while(z.l())}else{a+=H.e(z.gp())
for(;z.l();)a=a+c+H.e(z.gp())}return a}}},
cu:{"^":"k;"}}],["","",,W,{"^":"",
dr:function(a){var z,y
z=document
y=z.createElement("a")
return y},
ev:function(a,b){var z,y
z=document
y=z.createElement("canvas")
return y},
cM:function(a,b,c){var z,y
z=document.body
y=(z&&C.u).b5(z,a,b,c)
y.toString
z=new W.aN(y)
z=z.bK(z,new W.vs())
return z.gby(z)},
ch:function(a){var z,y,x
z="element tag unavailable"
try{y=J.hb(a)
if(typeof y==="string")z=J.hb(a)}catch(x){H.a3(x)}return z},
ax:function(a){var z,y,x
y=document
z=y.createElement("input")
if(a!=null)try{J.mt(z,a)}catch(x){H.a3(x)}return z},
qC:function(a,b,c,d){return new Option(a,b,c,!1)},
bW:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
lm:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
v8:function(a){if(a==null)return
return W.ft(a)},
lx:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.ft(a)
if(!!J.r(z).$isH)return z
return}else return a},
fJ:function(a){var z=$.M
if(z===C.h)return a
return z.ih(a,!0)},
K:{"^":"W;","%":"HTMLAppletElement|HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLegendElement|HTMLMarqueeElement|HTMLModElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
xM:{"^":"K;dz:download},aX:target=,D:type%,dE:hostname=,bi:href},dO:port=,cJ:protocol=",
v:function(a){return String(a)},
$isj:1,
"%":"HTMLAnchorElement"},
xP:{"^":"H;",
a1:function(a){return a.update()},
"%":"ApplicationCache|DOMApplicationCache|OfflineResourceList"},
xQ:{"^":"K;aX:target=,dE:hostname=,bi:href},dO:port=,cJ:protocol=",
v:function(a){return String(a)},
$isj:1,
"%":"HTMLAreaElement"},
xT:{"^":"j;a6:id=","%":"AudioTrack"},
xU:{"^":"H;k:length=","%":"AudioTrackList"},
xV:{"^":"K;bi:href},aX:target=","%":"HTMLBaseElement"},
cI:{"^":"j;D:type=",$iscI:1,"%":";Blob"},
xX:{"^":"j;B:name=","%":"BluetoothDevice"},
mz:{"^":"j;","%":"Response;Body"},
es:{"^":"K;",$ises:1,$isH:1,$isj:1,"%":"HTMLBodyElement"},
xY:{"^":"K;aG:disabled},B:name%,D:type%,G:value%","%":"HTMLButtonElement"},
y_:{"^":"j;",
jU:[function(a){return a.keys()},"$0","gI",0,0,31],
"%":"CacheStorage"},
y0:{"^":"K;ap:height},ar:width}",
fG:function(a,b,c){return a.getContext(b)},
fF:function(a,b){return this.fG(a,b,null)},
"%":"HTMLCanvasElement"},
y1:{"^":"j;aU:fillStyle%,cC:font},cg:globalCompositeOperation},cT:strokeStyle},dV:textAlign}",
Z:function(a){return a.beginPath()},
ik:function(a,b,c,d,e){return a.clearRect(b,c,d,e)},
iy:function(a,b,c,d,e){return a.createLinearGradient(b,c,d,e)},
iz:function(a,b,c,d,e,f,g){return a.createRadialGradient(b,c,d,e,f,g)},
iV:function(a,b,c,d,e){return a.fillRect(b,c,d,e)},
jN:function(a,b){return a.stroke(b)},
a3:function(a){return a.stroke()},
fU:function(a,b,c,d,e){return a.strokeRect(b,c,d,e)},
a8:function(a){return a.closePath()},
T:function(a,b,c){return a.lineTo(b,c)},
ab:function(a,b,c){return a.moveTo(b,c)},
eP:function(a,b,c,d,e,f,g){a.arc(b,c,d,e,f,g)},
aB:function(a,b,c,d,e,f){return this.eP(a,b,c,d,e,f,!1)},
iW:function(a,b,c,d,e){a.fillText(b,c,d)},
bG:function(a,b,c,d){return this.iW(a,b,c,d,null)},
iU:function(a,b){a.fill(b)},
az:function(a){return this.iU(a,"nonzero")},
"%":"CanvasRenderingContext2D"},
mC:{"^":"J;k:length=",$isj:1,"%":"CDATASection|Comment|Text;CharacterData"},
y3:{"^":"j;a6:id=","%":"Client|WindowClient"},
y5:{"^":"H;",$isH:1,$isj:1,"%":"CompositorWorker"},
y6:{"^":"j;a6:id=,B:name=,D:type=","%":"Credential|FederatedCredential|PasswordCredential"},
y7:{"^":"j;D:type=","%":"CryptoKey"},
y8:{"^":"aK;bb:style=","%":"CSSFontFaceRule"},
y9:{"^":"aK;bb:style=","%":"CSSKeyframeRule|MozCSSKeyframeRule|WebKitCSSKeyframeRule"},
ya:{"^":"aK;B:name=","%":"CSSKeyframesRule|MozCSSKeyframesRule|WebKitCSSKeyframesRule"},
yb:{"^":"aK;bb:style=","%":"CSSPageRule"},
aK:{"^":"j;D:type=",$isk:1,"%":"CSSCharsetRule|CSSGroupingRule|CSSImportRule|CSSMediaRule|CSSSupportsRule;CSSRule"},
mY:{"^":"ot;k:length=",
gcA:function(a){return a.display},
scA:function(a,b){a.display=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
ot:{"^":"j+mZ;"},
mZ:{"^":"k;"},
yc:{"^":"aK;bb:style=","%":"CSSStyleRule"},
yd:{"^":"aK;bb:style=","%":"CSSViewportRule"},
ng:{"^":"j;D:type=",$isng:1,$isk:1,"%":"DataTransferItem"},
yf:{"^":"j;k:length=",
bT:function(a,b,c){return a.add(b,c)},
F:function(a,b){return a.add(b)},
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
yh:{"^":"j;n:x=,m:y=","%":"DeviceAcceleration"},
yi:{"^":"aA;G:value=","%":"DeviceLightEvent"},
hy:{"^":"K;",$ishy:1,"%":"HTMLDivElement|PluginPlaceholderElement"},
yj:{"^":"J;",
gbh:function(a){if(a._docChildren==null)a._docChildren=new P.iQ(a,new W.aN(a))
return a._docChildren},
$isj:1,
"%":"DocumentFragment|ShadowRoot"},
yk:{"^":"j;B:name=","%":"DOMError|FileError"},
yl:{"^":"j;",
gB:function(a){var z=a.name
if(P.hx()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.hx()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
v:function(a){return String(a)},
"%":"DOMException"},
ym:{"^":"j;",
fl:[function(a,b){return a.next(b)},function(a){return a.next()},"jl","$1","$0","gbv",0,2,32,3],
"%":"Iterator"},
nl:{"^":"nm;",$isnl:1,$isk:1,"%":"DOMMatrix"},
nm:{"^":"j;","%":";DOMMatrixReadOnly"},
yn:{"^":"nn;",
gn:function(a){return a.x},
sn:function(a,b){a.x=b},
gm:function(a){return a.y},
sm:function(a,b){a.y=b},
"%":"DOMPoint"},
nn:{"^":"j;",
gn:function(a){return a.x},
gm:function(a){return a.y},
"%":";DOMPointReadOnly"},
no:{"^":"j;",
v:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.gar(a))+" x "+H.e(this.gap(a))},
S:function(a,b){var z
if(b==null)return!1
z=J.r(b)
if(!z.$isaM)return!1
return a.left===z.gdI(b)&&a.top===z.gdW(b)&&this.gar(a)===z.gar(b)&&this.gap(a)===z.gap(b)},
gah:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gar(a)
w=this.gap(a)
return W.lm(W.bW(W.bW(W.bW(W.bW(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gap:function(a){return a.height},
gdI:function(a){return a.left},
gdW:function(a){return a.top},
gar:function(a){return a.width},
gn:function(a){return a.x},
gm:function(a){return a.y},
$isaM:1,
$asaM:I.aI,
"%":";DOMRectReadOnly"},
yo:{"^":"np;G:value%","%":"DOMSettableTokenList"},
yp:{"^":"oP;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a.item(b)},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.t]},
$iso:1,
$ish:1,
$ash:function(){return[P.t]},
"%":"DOMStringList"},
ou:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.t]},
$iso:1,
$ish:1,
$ash:function(){return[P.t]}},
oP:{"^":"ou+aa;",$isi:1,
$asi:function(){return[P.t]},
$iso:1,
$ish:1,
$ash:function(){return[P.t]}},
np:{"^":"j;k:length=",
F:function(a,b){return a.add(b)},
M:function(a,b){return a.contains(b)},
"%":";DOMTokenList"},
tV:{"^":"cr;d9:a<,b",
M:function(a,b){return J.aT(this.b,b)},
gR:function(a){return this.a.firstElementChild==null},
gk:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.b(z,b)
return z[b]},
i:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.b(z,b)
this.a.replaceChild(c,z[b])},
sk:function(a,b){throw H.c(new P.z("Cannot resize element lists"))},
F:function(a,b){this.a.appendChild(b)
return b},
gA:function(a){var z=this.cc(this)
return H.l(new J.cH(z,z.length,0,null),[H.ah(z,0)])},
gP:function(a){var z=this.a.firstElementChild
if(z==null)throw H.c(new P.A("No elements"))
return z},
gU:function(a){var z=this.a.lastElementChild
if(z==null)throw H.c(new P.A("No elements"))
return z},
$ascr:function(){return[W.W]},
$asdP:function(){return[W.W]},
$asi:function(){return[W.W]},
$ash:function(){return[W.W]}},
W:{"^":"J;bb:style=,dt:className=,a6:id=,jG:tagName=",
gie:function(a){return new W.u0(a)},
gbh:function(a){return new W.tV(a,a.children)},
geU:function(a){return new W.u1(a)},
v:function(a){return a.localName},
b5:["cU",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.hB
if(z==null){z=H.l([],[W.f5])
y=new W.je(z)
z.push(W.lk(null))
z.push(W.lq())
$.hB=y
d=y}else d=z
z=$.hA
if(z==null){z=new W.lr(d)
$.hA=z
c=z}else{z.a=d
c=z}}if($.bD==null){z=document.implementation.createHTMLDocument("")
$.bD=z
$.eA=z.createRange()
z=$.bD
z.toString
x=z.createElement("base")
J.mq(x,document.baseURI)
$.bD.head.appendChild(x)}z=$.bD
if(!!this.$ises)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.bD.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.e.M(C.S,a.tagName)){$.eA.selectNodeContents(w)
v=$.eA.createContextualFragment(b)}else{w.innerHTML=b
v=$.bD.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.bD.body
if(w==null?z!=null:w!==z)J.aL(w)
c.e2(v)
document.adoptNode(v)
return v},function(a,b,c){return this.b5(a,b,c,null)},"ix",null,null,"gjS",2,5,null,3,3],
sa9:function(a,b){this.cP(a,b)},
cQ:function(a,b,c,d){a.textContent=null
a.appendChild(this.b5(a,b,c,d))},
cP:function(a,b){return this.cQ(a,b,null,null)},
b4:function(a){return a.click()},
bH:function(a){return a.focus()},
$isW:1,
$isJ:1,
$isk:1,
$isj:1,
$isH:1,
"%":";Element"},
vs:{"^":"a:2;",
$1:function(a){return!!J.r(a).$isW}},
yq:{"^":"K;ap:height},B:name%,D:type%,ar:width}","%":"HTMLEmbedElement"},
yr:{"^":"j;B:name=",
hX:function(a,b,c){return a.remove(H.b2(b,0),H.b2(c,1))},
bJ:function(a){var z=H.l(new P.lc(H.l(new P.aO(0,$.M,null),[null])),[null])
this.hX(a,new W.nv(z),new W.nw(z))
return z.a},
"%":"DirectoryEntry|Entry|FileEntry"},
nv:{"^":"a:3;a",
$0:[function(){this.a.im(0)},null,null,0,0,null,"call"]},
nw:{"^":"a:2;a",
$1:[function(a){this.a.eX(a)},null,null,2,0,null,5,"call"]},
ys:{"^":"aA;aL:error=","%":"ErrorEvent"},
aA:{"^":"j;D:type=",
gaX:function(a){return W.lx(a.target)},
c9:function(a){return a.preventDefault()},
b_:function(a){return a.stopImmediatePropagation()},
a2:function(a){return a.stopPropagation()},
$isaA:1,
$isk:1,
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
H:{"^":"j;",
L:function(a,b,c,d){return a.addEventListener(b,H.b2(c,1),d)},
hZ:function(a,b,c,d){return a.removeEventListener(b,H.b2(c,1),d)},
$isH:1,
"%":"Animation|AudioContext|BatteryManager|CrossOriginServiceWorkerClient|EventSource|MIDIAccess|MediaController|MediaQueryList|MediaSource|OfflineAudioContext|Performance|PermissionStatus|Presentation|RTCDTMFSender|RTCPeerConnection|ServicePortCollection|ServiceWorkerContainer|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StashedPortCollection|WorkerPerformance|mozRTCPeerConnection|webkitAudioContext|webkitRTCPeerConnection;EventTarget;iB|iD|iC|iE"},
yL:{"^":"K;aG:disabled},B:name%,D:type=","%":"HTMLFieldSetElement"},
aW:{"^":"cI;B:name=",$isaW:1,$isk:1,"%":"File"},
iP:{"^":"oQ;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isiP:1,
$isQ:1,
$asQ:function(){return[W.aW]},
$isO:1,
$asO:function(){return[W.aW]},
$isi:1,
$asi:function(){return[W.aW]},
$iso:1,
$ish:1,
$ash:function(){return[W.aW]},
"%":"FileList"},
ov:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.aW]},
$iso:1,
$ish:1,
$ash:function(){return[W.aW]}},
oQ:{"^":"ov+aa;",$isi:1,
$asi:function(){return[W.aW]},
$iso:1,
$ish:1,
$ash:function(){return[W.aW]}},
oi:{"^":"H;aL:error=",
gae:function(a){var z=a.result
if(!!J.r(z).$ishn)return new Uint8Array(z,0)
return z},
"%":"FileReader"},
yM:{"^":"j;D:type=","%":"Stream"},
yN:{"^":"j;B:name=","%":"DOMFileSystem"},
yO:{"^":"H;aL:error=,k:length=","%":"FileWriter"},
on:{"^":"j;bb:style=",$ison:1,$isk:1,"%":"FontFace"},
yS:{"^":"H;",
F:function(a,b){return a.add(b)},
jT:function(a,b,c){return a.forEach(H.b2(b,3),c)},
V:function(a,b){b=H.b2(b,3)
return a.forEach(b)},
"%":"FontFaceSet"},
yU:{"^":"j;",
E:function(a,b){return a.get(b)},
"%":"FormData"},
yV:{"^":"K;k:length=,B:name%,aX:target=","%":"HTMLFormElement"},
bH:{"^":"j;a6:id=",$isk:1,"%":"Gamepad"},
yW:{"^":"j;G:value=","%":"GamepadButton"},
yX:{"^":"aA;a6:id=","%":"GeofencingEvent"},
yY:{"^":"j;a6:id=","%":"CircularGeofencingRegion|GeofencingRegion"},
yZ:{"^":"j;k:length=","%":"History"},
z_:{"^":"oR;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]},
$isQ:1,
$asQ:function(){return[W.J]},
$isO:1,
$asO:function(){return[W.J]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
ow:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]}},
oR:{"^":"ow+aa;",$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]}},
z0:{"^":"op;",
bl:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
op:{"^":"H;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
z1:{"^":"K;ap:height},B:name%,ar:width}","%":"HTMLIFrameElement"},
dM:{"^":"j;",$isdM:1,"%":"ImageData"},
z3:{"^":"K;ap:height},ar:width}","%":"HTMLImageElement"},
iU:{"^":"K;bs:checked},aG:disabled},ap:height},B:name%,aP:step},D:type%,G:value%,ar:width}",$isiU:1,$isW:1,$isj:1,$isH:1,$isJ:1,$iscX:1,$isjA:1,$isho:1,$isaZ:1,$iskW:1,"%":"HTMLInputElement"},
za:{"^":"K;aG:disabled},B:name%,D:type=","%":"HTMLKeygenElement"},
zb:{"^":"K;G:value%","%":"HTMLLIElement"},
zc:{"^":"K;j9:htmlFor}","%":"HTMLLabelElement"},
ze:{"^":"K;aG:disabled},bi:href},D:type%","%":"HTMLLinkElement"},
zf:{"^":"j;",
v:function(a){return String(a)},
"%":"Location"},
zg:{"^":"K;dn:areas=,B:name%","%":"HTMLMapElement"},
pE:{"^":"K;aL:error=","%":"HTMLAudioElement;HTMLMediaElement"},
zj:{"^":"H;",
aa:function(a,b){return a.load(b)},
bJ:function(a){return a.remove()},
"%":"MediaKeySession"},
zk:{"^":"j;k:length=","%":"MediaList"},
zl:{"^":"H;ax:active=,a6:id=","%":"MediaStream"},
zm:{"^":"H;a6:id=","%":"MediaStreamTrack"},
zn:{"^":"K;D:type%","%":"HTMLMenuElement"},
zo:{"^":"K;bs:checked},aG:disabled},dF:icon=,D:type%","%":"HTMLMenuItemElement"},
eY:{"^":"H;",$iseY:1,$isk:1,"%":";MessagePort"},
zp:{"^":"K;B:name%","%":"HTMLMetaElement"},
zq:{"^":"K;G:value%","%":"HTMLMeterElement"},
zr:{"^":"pF;",
jM:function(a,b,c){return a.send(b,c)},
bl:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
pF:{"^":"H;a6:id=,B:name=,D:type=","%":"MIDIInput;MIDIPort"},
bK:{"^":"j;D:type=",$isk:1,"%":"MimeType"},
zs:{"^":"p1;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isQ:1,
$asQ:function(){return[W.bK]},
$isO:1,
$asO:function(){return[W.bK]},
$isi:1,
$asi:function(){return[W.bK]},
$iso:1,
$ish:1,
$ash:function(){return[W.bK]},
"%":"MimeTypeArray"},
oH:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bK]},
$iso:1,
$ish:1,
$ash:function(){return[W.bK]}},
p1:{"^":"oH+aa;",$isi:1,
$asi:function(){return[W.bK]},
$iso:1,
$ish:1,
$ash:function(){return[W.bK]}},
f1:{"^":"tD;a7:button=",$isf1:1,$isaA:1,$isk:1,"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
zt:{"^":"j;aX:target=,D:type=","%":"MutationRecord"},
zE:{"^":"j;",$isj:1,"%":"Navigator"},
zF:{"^":"j;B:name=","%":"NavigatorUserMediaError"},
zG:{"^":"H;D:type=","%":"NetworkInformation"},
aN:{"^":"cr;a",
gP:function(a){var z=this.a.firstChild
if(z==null)throw H.c(new P.A("No elements"))
return z},
gU:function(a){var z=this.a.lastChild
if(z==null)throw H.c(new P.A("No elements"))
return z},
gby:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.c(new P.A("No elements"))
if(y>1)throw H.c(new P.A("More than one element"))
return z.firstChild},
F:function(a,b){this.a.appendChild(b)},
av:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
i:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.b(y,b)
z.replaceChild(c,y[b])},
gA:function(a){return C.U.gA(this.a.childNodes)},
gk:function(a){return this.a.childNodes.length},
sk:function(a,b){throw H.c(new P.z("Cannot set length on immutable List."))},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.b(z,b)
return z[b]},
$ascr:function(){return[W.J]},
$asdP:function(){return[W.J]},
$asi:function(){return[W.J]},
$ash:function(){return[W.J]}},
J:{"^":"H;fg:lastChild=,jn:nodeType=,aA:parentElement=,cG:parentNode=,dP:previousSibling=",
gjo:function(a){return new W.aN(a)},
bJ:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
jC:function(a,b){var z,y
try{z=a.parentNode
J.m7(z,b,a)}catch(y){H.a3(y)}return a},
v:function(a){var z=a.nodeValue
return z==null?this.fZ(a):z},
M:function(a,b){return a.contains(b)},
hY:function(a,b){return a.removeChild(b)},
i_:function(a,b,c){return a.replaceChild(b,c)},
$isJ:1,
$isk:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
zH:{"^":"j;",
jr:[function(a){return a.previousNode()},"$0","gdP",0,0,13],
"%":"NodeIterator"},
qy:{"^":"p2;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]},
$isQ:1,
$asQ:function(){return[W.J]},
$isO:1,
$asO:function(){return[W.J]},
"%":"NodeList|RadioNodeList"},
oI:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]}},
p2:{"^":"oI+aa;",$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]}},
zI:{"^":"H;dF:icon=","%":"Notification"},
zK:{"^":"K;D:type%","%":"HTMLOListElement"},
zL:{"^":"K;ap:height},B:name%,D:type%,ar:width}","%":"HTMLObjectElement"},
zN:{"^":"K;aG:disabled}","%":"HTMLOptGroupElement"},
zO:{"^":"K;aG:disabled},G:value%","%":"HTMLOptionElement"},
zQ:{"^":"K;B:name%,D:type=,G:value%","%":"HTMLOutputElement"},
zR:{"^":"K;B:name%,G:value%","%":"HTMLParamElement"},
zS:{"^":"j;",$isj:1,"%":"Path2D"},
Ac:{"^":"j;B:name=","%":"PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceRenderTiming|PerformanceResourceTiming"},
Ad:{"^":"j;D:type=","%":"PerformanceNavigation"},
bN:{"^":"j;k:length=,B:name=",$isk:1,"%":"Plugin"},
Ae:{"^":"p3;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.bN]},
$iso:1,
$ish:1,
$ash:function(){return[W.bN]},
$isQ:1,
$asQ:function(){return[W.bN]},
$isO:1,
$asO:function(){return[W.bN]},
"%":"PluginArray"},
oJ:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bN]},
$iso:1,
$ish:1,
$ash:function(){return[W.bN]}},
p3:{"^":"oJ+aa;",$isi:1,
$asi:function(){return[W.bN]},
$iso:1,
$ish:1,
$ash:function(){return[W.bN]}},
Ah:{"^":"H;G:value=","%":"PresentationAvailability"},
Ai:{"^":"H;a6:id=",
bl:function(a,b){return a.send(b)},
"%":"PresentationSession"},
Aj:{"^":"mC;aX:target=","%":"ProcessingInstruction"},
Ak:{"^":"K;G:value%","%":"HTMLProgressElement"},
fc:{"^":"aA;",$isfc:1,$isaA:1,$isk:1,"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
Aq:{"^":"H;a6:id=",
bl:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
Ar:{"^":"j;D:type%","%":"RTCSessionDescription|mozRTCSessionDescription"},
ff:{"^":"j;a6:id=,D:type=",$isff:1,$isk:1,"%":"RTCStatsReport"},
As:{"^":"j;",
jX:[function(a){return a.result()},"$0","gae",0,0,34],
"%":"RTCStatsResponse"},
At:{"^":"H;br:angle=,D:type=","%":"ScreenOrientation"},
Au:{"^":"K;D:type%","%":"HTMLScriptElement"},
Av:{"^":"K;aG:disabled},k:length=,B:name%,D:type=,G:value%","%":"HTMLSelectElement"},
Aw:{"^":"j;D:type=","%":"Selection"},
Ax:{"^":"j;B:name=","%":"ServicePort"},
Ay:{"^":"H;ax:active=",
a1:function(a){return a.update()},
"%":"ServiceWorkerRegistration"},
Az:{"^":"H;",$isH:1,$isj:1,"%":"SharedWorker"},
AA:{"^":"tI;B:name=","%":"SharedWorkerGlobalScope"},
bP:{"^":"H;aW:mode%",$isk:1,"%":"SourceBuffer"},
AB:{"^":"iD;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.bP]},
$iso:1,
$ish:1,
$ash:function(){return[W.bP]},
$isQ:1,
$asQ:function(){return[W.bP]},
$isO:1,
$asO:function(){return[W.bP]},
"%":"SourceBufferList"},
iB:{"^":"H+Z;",$isi:1,
$asi:function(){return[W.bP]},
$iso:1,
$ish:1,
$ash:function(){return[W.bP]}},
iD:{"^":"iB+aa;",$isi:1,
$asi:function(){return[W.bP]},
$iso:1,
$ish:1,
$ash:function(){return[W.bP]}},
AC:{"^":"K;D:type%","%":"HTMLSourceElement"},
AD:{"^":"j;a6:id=","%":"SourceInfo"},
bQ:{"^":"j;",$isk:1,"%":"SpeechGrammar"},
AE:{"^":"p4;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.bQ]},
$iso:1,
$ish:1,
$ash:function(){return[W.bQ]},
$isQ:1,
$asQ:function(){return[W.bQ]},
$isO:1,
$asO:function(){return[W.bQ]},
"%":"SpeechGrammarList"},
oK:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bQ]},
$iso:1,
$ish:1,
$ash:function(){return[W.bQ]}},
p4:{"^":"oK+aa;",$isi:1,
$asi:function(){return[W.bQ]},
$iso:1,
$ish:1,
$ash:function(){return[W.bQ]}},
AF:{"^":"aA;aL:error=","%":"SpeechRecognitionError"},
bR:{"^":"j;k:length=",$isk:1,"%":"SpeechRecognitionResult"},
AG:{"^":"aA;B:name=","%":"SpeechSynthesisEvent"},
AH:{"^":"j;B:name=","%":"SpeechSynthesisVoice"},
t9:{"^":"eY;B:name=",$ist9:1,$iseY:1,$isk:1,"%":"StashedMessagePort"},
AJ:{"^":"j;",
H:function(a,b){return a.getItem(b)!=null},
h:function(a,b){return a.getItem(b)},
i:function(a,b,c){a.setItem(b,c)},
V:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gI:function(a){var z=H.l([],[P.t])
this.V(a,new W.tb(z))
return z},
ga_:function(a){var z=H.l([],[P.t])
this.V(a,new W.tc(z))
return z},
gk:function(a){return a.length},
gR:function(a){return a.key(0)==null},
$isB:1,
$asB:function(){return[P.t,P.t]},
"%":"Storage"},
tb:{"^":"a:1;a",
$2:function(a,b){return this.a.push(a)}},
tc:{"^":"a:1;a",
$2:function(a,b){return this.a.push(b)}},
AL:{"^":"K;aG:disabled},D:type%","%":"HTMLStyleElement"},
AN:{"^":"j;D:type=","%":"StyleMedia"},
bS:{"^":"j;D:type=",$isk:1,"%":"CSSStyleSheet|StyleSheet"},
AQ:{"^":"K;",
b5:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.cU(a,b,c,d)
z=W.cM("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
new W.aN(y).av(0,J.mf(z))
return y},
"%":"HTMLTableElement"},
AR:{"^":"K;",
b5:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.cU(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.h1(y.createElement("table"),b,c,d)
y.toString
y=new W.aN(y)
x=y.gby(y)
x.toString
y=new W.aN(x)
w=y.gby(y)
z.toString
w.toString
new W.aN(z).av(0,new W.aN(w))
return z},
"%":"HTMLTableRowElement"},
AS:{"^":"K;",
b5:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.cU(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.h1(y.createElement("table"),b,c,d)
y.toString
y=new W.aN(y)
x=y.gby(y)
z.toString
x.toString
new W.aN(z).av(0,new W.aN(x))
return z},
"%":"HTMLTableSectionElement"},
kU:{"^":"K;",
cQ:function(a,b,c,d){var z
a.textContent=null
z=this.b5(a,b,c,d)
a.content.appendChild(z)},
cP:function(a,b){return this.cQ(a,b,null,null)},
$iskU:1,
"%":"HTMLTemplateElement"},
fm:{"^":"K;aG:disabled},B:name%,jD:rows},D:type=,G:value%",$isfm:1,"%":"HTMLTextAreaElement"},
bT:{"^":"H;a6:id=,aW:mode%",$isk:1,"%":"TextTrack"},
bU:{"^":"H;a6:id=",$isk:1,"%":"TextTrackCue|VTTCue"},
AV:{"^":"p5;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isQ:1,
$asQ:function(){return[W.bU]},
$isO:1,
$asO:function(){return[W.bU]},
$isi:1,
$asi:function(){return[W.bU]},
$iso:1,
$ish:1,
$ash:function(){return[W.bU]},
"%":"TextTrackCueList"},
oL:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bU]},
$iso:1,
$ish:1,
$ash:function(){return[W.bU]}},
p5:{"^":"oL+aa;",$isi:1,
$asi:function(){return[W.bU]},
$iso:1,
$ish:1,
$ash:function(){return[W.bU]}},
AW:{"^":"iE;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isQ:1,
$asQ:function(){return[W.bT]},
$isO:1,
$asO:function(){return[W.bT]},
$isi:1,
$asi:function(){return[W.bT]},
$iso:1,
$ish:1,
$ash:function(){return[W.bT]},
"%":"TextTrackList"},
iC:{"^":"H+Z;",$isi:1,
$asi:function(){return[W.bT]},
$iso:1,
$ish:1,
$ash:function(){return[W.bT]}},
iE:{"^":"iC+aa;",$isi:1,
$asi:function(){return[W.bT]},
$iso:1,
$ish:1,
$ash:function(){return[W.bT]}},
AX:{"^":"j;k:length=","%":"TimeRanges"},
bV:{"^":"j;",
gaX:function(a){return W.lx(a.target)},
$isk:1,
"%":"Touch"},
AY:{"^":"p6;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.bV]},
$iso:1,
$ish:1,
$ash:function(){return[W.bV]},
$isQ:1,
$asQ:function(){return[W.bV]},
$isO:1,
$asO:function(){return[W.bV]},
"%":"TouchList"},
oM:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bV]},
$iso:1,
$ish:1,
$ash:function(){return[W.bV]}},
p6:{"^":"oM+aa;",$isi:1,
$asi:function(){return[W.bV]},
$iso:1,
$ish:1,
$ash:function(){return[W.bV]}},
AZ:{"^":"j;D:type=","%":"TrackDefault"},
B_:{"^":"j;k:length=","%":"TrackDefaultList"},
B2:{"^":"j;",
jV:[function(a){return a.lastChild()},"$0","gfg",0,0,13],
jW:[function(a){return a.parentNode()},"$0","gcG",0,0,13],
jr:[function(a){return a.previousNode()},"$0","gdP",0,0,13],
"%":"TreeWalker"},
tD:{"^":"aA;","%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
B7:{"^":"j;",
v:function(a){return String(a)},
$isj:1,
"%":"URL"},
B9:{"^":"pE;ap:height},ar:width}","%":"HTMLVideoElement"},
Ba:{"^":"j;a6:id=","%":"VideoTrack"},
Bb:{"^":"H;k:length=","%":"VideoTrackList"},
Bf:{"^":"j;a6:id=","%":"VTTRegion"},
Bg:{"^":"j;k:length=","%":"VTTRegionList"},
Bh:{"^":"H;",
bl:function(a,b){return a.send(b)},
"%":"WebSocket"},
fp:{"^":"H;B:name=",
gaA:function(a){return W.v8(a.parent)},
$isfp:1,
$isj:1,
$isH:1,
"%":"DOMWindow|Window"},
Bi:{"^":"H;",$isH:1,$isj:1,"%":"Worker"},
tI:{"^":"H;",$isj:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope;WorkerGlobalScope"},
Bm:{"^":"J;B:name=,G:value%","%":"Attr"},
Bn:{"^":"j;ap:height=,dI:left=,dW:top=,ar:width=",
v:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
S:function(a,b){var z,y,x
if(b==null)return!1
z=J.r(b)
if(!z.$isaM)return!1
y=a.left
x=z.gdI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gdW(b)
if(y==null?x==null:y===x){y=a.width
x=z.gar(b)
if(y==null?x==null:y===x){y=a.height
z=z.gap(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gah:function(a){var z,y,x,w
z=J.bg(a.left)
y=J.bg(a.top)
x=J.bg(a.width)
w=J.bg(a.height)
return W.lm(W.bW(W.bW(W.bW(W.bW(0,z),y),x),w))},
$isaM:1,
$asaM:I.aI,
"%":"ClientRect"},
Bo:{"^":"p7;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a.item(b)},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.aM]},
$iso:1,
$ish:1,
$ash:function(){return[P.aM]},
"%":"ClientRectList|DOMRectList"},
oN:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.aM]},
$iso:1,
$ish:1,
$ash:function(){return[P.aM]}},
p7:{"^":"oN+aa;",$isi:1,
$asi:function(){return[P.aM]},
$iso:1,
$ish:1,
$ash:function(){return[P.aM]}},
Bp:{"^":"p8;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.aK]},
$iso:1,
$ish:1,
$ash:function(){return[W.aK]},
$isQ:1,
$asQ:function(){return[W.aK]},
$isO:1,
$asO:function(){return[W.aK]},
"%":"CSSRuleList"},
oO:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.aK]},
$iso:1,
$ish:1,
$ash:function(){return[W.aK]}},
p8:{"^":"oO+aa;",$isi:1,
$asi:function(){return[W.aK]},
$iso:1,
$ish:1,
$ash:function(){return[W.aK]}},
Bq:{"^":"J;",$isj:1,"%":"DocumentType"},
Br:{"^":"no;",
gap:function(a){return a.height},
gar:function(a){return a.width},
gn:function(a){return a.x},
sn:function(a,b){a.x=b},
gm:function(a){return a.y},
sm:function(a,b){a.y=b},
"%":"DOMRect"},
Bt:{"^":"oS;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isQ:1,
$asQ:function(){return[W.bH]},
$isO:1,
$asO:function(){return[W.bH]},
$isi:1,
$asi:function(){return[W.bH]},
$iso:1,
$ish:1,
$ash:function(){return[W.bH]},
"%":"GamepadList"},
ox:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bH]},
$iso:1,
$ish:1,
$ash:function(){return[W.bH]}},
oS:{"^":"ox+aa;",$isi:1,
$asi:function(){return[W.bH]},
$iso:1,
$ish:1,
$ash:function(){return[W.bH]}},
Bv:{"^":"K;",$isH:1,$isj:1,"%":"HTMLFrameSetElement"},
By:{"^":"oT;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]},
$isQ:1,
$asQ:function(){return[W.J]},
$isO:1,
$asO:function(){return[W.J]},
"%":"MozNamedAttrMap|NamedNodeMap"},
oy:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]}},
oT:{"^":"oy+aa;",$isi:1,
$asi:function(){return[W.J]},
$iso:1,
$ish:1,
$ash:function(){return[W.J]}},
Bz:{"^":"mz;aW:mode=","%":"Request"},
BD:{"^":"H;",$isH:1,$isj:1,"%":"ServiceWorker"},
BE:{"^":"oU;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.bR]},
$iso:1,
$ish:1,
$ash:function(){return[W.bR]},
$isQ:1,
$asQ:function(){return[W.bR]},
$isO:1,
$asO:function(){return[W.bR]},
"%":"SpeechRecognitionResultList"},
oz:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bR]},
$iso:1,
$ish:1,
$ash:function(){return[W.bR]}},
oU:{"^":"oz+aa;",$isi:1,
$asi:function(){return[W.bR]},
$iso:1,
$ish:1,
$ash:function(){return[W.bR]}},
BF:{"^":"oV;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isQ:1,
$asQ:function(){return[W.bS]},
$isO:1,
$asO:function(){return[W.bS]},
$isi:1,
$asi:function(){return[W.bS]},
$iso:1,
$ish:1,
$ash:function(){return[W.bS]},
"%":"StyleSheetList"},
oA:{"^":"j+Z;",$isi:1,
$asi:function(){return[W.bS]},
$iso:1,
$ish:1,
$ash:function(){return[W.bS]}},
oV:{"^":"oA+aa;",$isi:1,
$asi:function(){return[W.bS]},
$iso:1,
$ish:1,
$ash:function(){return[W.bS]}},
BH:{"^":"j;",$isj:1,"%":"WorkerLocation"},
BI:{"^":"j;",$isj:1,"%":"WorkerNavigator"},
tS:{"^":"k;d9:a<",
V:function(a,b){var z,y,x,w,v
for(z=this.gI(this),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.x)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gI:function(a){var z,y,x,w,v
z=this.a.attributes
y=H.l([],[P.t])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.b(z,w)
v=z[w]
if(v.namespaceURI==null)y.push(J.am(v))}return y},
ga_:function(a){var z,y,x,w,v
z=this.a.attributes
y=H.l([],[P.t])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.b(z,w)
v=z[w]
if(v.namespaceURI==null)y.push(J.cF(v))}return y},
gR:function(a){return this.gI(this).length===0},
$isB:1,
$asB:function(){return[P.t,P.t]}},
u0:{"^":"tS;a",
H:function(a,b){return this.a.hasAttribute(b)},
h:function(a,b){return this.a.getAttribute(b)},
i:function(a,b,c){this.a.setAttribute(b,c)},
gk:function(a){return this.gI(this).length}},
u1:{"^":"ht;d9:a<",
aE:function(){var z,y,x,w,v
z=P.ab(null,null,null,P.t)
for(y=this.a.className.split(" "),x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){v=J.cG(y[w])
if(v.length!==0)z.F(0,v)}return z},
e0:function(a){this.a.className=a.c6(0," ")},
gk:function(a){return this.a.classList.length},
gR:function(a){return this.a.classList.length===0},
M:function(a,b){return typeof b==="string"&&this.a.classList.contains(b)},
F:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y},
ad:function(a,b){var z,y,x
z=this.a.classList
y=z.contains(b)
z.remove(b)
x=y
return x}},
iA:{"^":"k;a"},
lg:{"^":"bb;a,b,c",
bj:function(a,b,c,d){var z=new W.fv(0,this.a,this.b,W.fJ(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.cq()
return z},
fh:function(a,b,c){return this.bj(a,null,b,c)}},
fv:{"^":"td;a,b,c,d,e",
cs:function(a){if(this.b==null)return
this.eI()
this.b=null
this.d=null
return},
dM:function(a,b){if(this.b==null)return;++this.a
this.eI()},
fn:function(a){return this.dM(a,null)},
gdG:function(){return this.a>0},
fq:function(a){if(this.b==null||this.a<=0)return;--this.a
this.cq()},
cq:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.a7(x,this.c,z,!1)}},
eI:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.ef(x,this.c,z,!1)}}},
fy:{"^":"k;fC:a<",
bE:function(a){return $.$get$ll().M(0,W.ch(a))},
bq:function(a,b,c){var z,y,x
z=W.ch(a)
y=$.$get$fz()
x=y.h(0,H.e(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
hr:function(a){var z,y
z=$.$get$fz()
if(z.gR(z)){for(y=0;y<262;++y)z.i(0,C.R[y],W.wK())
for(y=0;y<12;++y)z.i(0,C.t[y],W.wL())}},
$isf5:1,
C:{
lk:function(a){var z=new W.fy(new W.uJ(W.dr(null),window.location))
z.hr(a)
return z},
Bw:[function(a,b,c,d){return!0},"$4","wK",8,0,19,6,16,1,17],
Bx:[function(a,b,c,d){var z,y,x,w,v
z=d.gfC()
y=z.a
x=J.f(y)
x.sbi(y,c)
w=x.gdE(y)
z=z.b
v=z.hostname
if(w==null?v==null:w===v){w=x.gdO(y)
v=z.port
if(w==null?v==null:w===v){w=x.gcJ(y)
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x.gdE(y)==="")if(x.gdO(y)==="")z=x.gcJ(y)===":"||x.gcJ(y)===""
else z=!1
else z=!1
else z=!0
return z},"$4","wL",8,0,19,6,16,1,17]}},
aa:{"^":"k;",
gA:function(a){return H.l(new W.om(a,this.gk(a),-1,null),[H.ag(a,"aa",0)])},
F:function(a,b){throw H.c(new P.z("Cannot add to immutable List."))},
$isi:1,
$asi:null,
$iso:1,
$ish:1,
$ash:null},
je:{"^":"k;a",
F:function(a,b){this.a.push(b)},
bE:function(a){return C.e.cr(this.a,new W.qA(a))},
bq:function(a,b,c){return C.e.cr(this.a,new W.qz(a,b,c))}},
qA:{"^":"a:2;a",
$1:function(a){return a.bE(this.a)}},
qz:{"^":"a:2;a,b,c",
$1:function(a){return a.bq(this.a,this.b,this.c)}},
uK:{"^":"k;fC:d<",
bE:function(a){return this.a.M(0,W.ch(a))},
bq:["h5",function(a,b,c){var z,y
z=W.ch(a)
y=this.c
if(y.M(0,H.e(z)+"::"+b))return this.d.ib(c)
else if(y.M(0,"*::"+b))return this.d.ib(c)
else{y=this.b
if(y.M(0,H.e(z)+"::"+b))return!0
else if(y.M(0,"*::"+b))return!0
else if(y.M(0,H.e(z)+"::*"))return!0
else if(y.M(0,"*::*"))return!0}return!1}],
hs:function(a,b,c,d){var z,y,x
this.a.av(0,c)
z=b.bK(0,new W.uL())
y=b.bK(0,new W.uM())
this.b.av(0,z)
x=this.c
x.av(0,C.r)
x.av(0,y)}},
uL:{"^":"a:2;",
$1:function(a){return!C.e.M(C.t,a)}},
uM:{"^":"a:2;",
$1:function(a){return C.e.M(C.t,a)}},
uV:{"^":"uK;e,a,b,c,d",
bq:function(a,b,c){if(this.h5(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.h3(a).a.getAttribute("template")==="")return this.e.M(0,b)
return!1},
C:{
lq:function(){var z,y
z=P.j5(C.A,P.t)
y=H.l(new H.cs(C.A,new W.uW()),[null,null])
z=new W.uV(z,P.ab(null,null,null,P.t),P.ab(null,null,null,P.t),P.ab(null,null,null,P.t),null)
z.hs(null,y,["TEMPLATE"],null)
return z}}},
uW:{"^":"a:2;",
$1:[function(a){return"TEMPLATE::"+H.e(a)},null,null,2,0,null,29,"call"]},
uT:{"^":"k;",
bE:function(a){var z=J.r(a)
if(!!z.$isjE)return!1
z=!!z.$isR
if(z&&W.ch(a)==="foreignObject")return!1
if(z)return!0
return!1},
bq:function(a,b,c){if(b==="is"||C.f.cS(b,"on"))return!1
return this.bE(a)}},
om:{"^":"k;a,b,c,d",
l:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.ad(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gp:function(){return this.d}},
tX:{"^":"k;a",
gaA:function(a){return W.ft(this.a.parent)},
$isH:1,
$isj:1,
C:{
ft:function(a){if(a===window)return a
else return new W.tX(a)}}},
f5:{"^":"k;"},
uJ:{"^":"k;a,b"},
lr:{"^":"k;a",
e2:function(a){new W.uZ(this).$2(a,null)},
bS:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
i2:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.h3(a)
x=y.gd9().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w===!0?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.a3(t)}v="element unprintable"
try{v=J.aU(a)}catch(t){H.a3(t)}try{u=W.ch(a)
this.i1(a,b,z,v,u,y,x)}catch(t){if(H.a3(t) instanceof P.bi)throw t
else{this.bS(a,b)
window
s="Removing corrupted element "+H.e(v)
if(typeof console!="undefined")console.warn(s)}}},
i1:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.bS(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.bE(a)){this.bS(a,b)
window
z="Removing disallowed element <"+H.e(e)+"> from "+J.aU(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.bq(a,"is",g)){this.bS(a,b)
window
z="Removing disallowed type extension <"+H.e(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gI(f)
y=H.l(z.slice(),[H.ah(z,0)])
for(x=f.gI(f).length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.b(y,x)
w=y[x]
if(!this.a.bq(a,J.mw(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.e(e)+" "+H.e(w)+'="'+H.e(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.r(a).$iskU)this.e2(a.content)}},
uZ:{"^":"a:35;a",
$2:function(a,b){var z,y,x,w,v
x=this.a
w=a
switch(J.me(w)){case 1:x.i2(w,b)
break
case 8:case 11:case 3:case 4:break
default:x.bS(w,b)}z=J.h8(a)
for(;null!=z;){y=null
try{y=J.mg(z)}catch(v){H.a3(v)
x=z
w=a
if(w==null){w=J.f(x)
if(w.gcG(x)!=null){w.gcG(x)
w.gcG(x).removeChild(x)}}else J.m6(w,x)
z=null
y=J.h8(a)}if(z!=null)this.$2(z,a)
z=y}}}}],["","",,P,{"^":"",
lw:function(a){var z,y
z=H.l(new P.uU(H.l(new P.aO(0,$.M,null),[null])),[null])
a.toString
y=H.l(new W.lg(a,"success",!1),[H.ah(C.H,0)])
H.l(new W.fv(0,y.a,y.b,W.fJ(new P.v7(a,z)),!1),[H.ah(y,0)]).cq()
y=H.l(new W.lg(a,"error",!1),[H.ah(C.G,0)])
H.l(new W.fv(0,y.a,y.b,W.fJ(z.gio()),!1),[H.ah(y,0)]).cq()
return z.a},
n_:{"^":"j;",
fl:[function(a,b){a.continue(b)},function(a){return this.fl(a,null)},"jl","$1","$0","gbv",0,2,36,3],
"%":";IDBCursor"},
ye:{"^":"n_;",
gG:function(a){var z,y
z=a.value
y=new P.fq([],[],!1)
y.c=!1
return y.b8(z)},
"%":"IDBCursorWithValue"},
yg:{"^":"H;B:name=","%":"IDBDatabase"},
v7:{"^":"a:2;a,b",
$1:[function(a){var z,y,x
z=this.a.result
y=new P.fq([],[],!1)
y.c=!1
x=y.b8(z)
z=this.b.a
if(z.a!==0)H.F(new P.A("Future already completed"))
z.b2(x)},null,null,2,0,null,0,"call"]},
oq:{"^":"j;B:name=",
E:function(a,b){var z,y,x,w,v
try{z=a.get(b)
w=P.lw(z)
return w}catch(v){w=H.a3(v)
y=w
x=H.aB(v)
return P.iS(y,x,null)}},
$isoq:1,
$isk:1,
"%":"IDBIndex"},
eV:{"^":"j;",$iseV:1,"%":"IDBKeyRange"},
zM:{"^":"j;B:name=",
bT:function(a,b,c){var z,y,x,w,v
try{z=null
if(c!=null)z=this.er(a,b,c)
else z=this.hP(a,b)
w=P.lw(z)
return w}catch(v){w=H.a3(v)
y=w
x=H.aB(v)
return P.iS(y,x,null)}},
F:function(a,b){return this.bT(a,b,null)},
er:function(a,b,c){return a.add(new P.uR([],[]).b8(b))},
hP:function(a,b){return this.er(a,b,null)},
"%":"IDBObjectStore"},
Ao:{"^":"H;aL:error=",
gae:function(a){var z,y
z=a.result
y=new P.fq([],[],!1)
y.c=!1
return y.b8(z)},
"%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},
B0:{"^":"H;aL:error=,aW:mode=","%":"IDBTransaction"}}],["","",,P,{"^":"",xK:{"^":"c3;aX:target=",$isj:1,"%":"SVGAElement"},xN:{"^":"j;G:value%","%":"SVGAngle"},xO:{"^":"R;",$isj:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},yt:{"^":"R;aW:mode=,ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEBlendElement"},yu:{"^":"R;D:type=,a_:values=,ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEColorMatrixElement"},yv:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEComponentTransferElement"},yw:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFECompositeElement"},yx:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEConvolveMatrixElement"},yy:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEDiffuseLightingElement"},yz:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEDisplacementMapElement"},yA:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEFloodElement"},yB:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEGaussianBlurElement"},yC:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEImageElement"},yD:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEMergeElement"},yE:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEMorphologyElement"},yF:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFEOffsetElement"},yG:{"^":"R;n:x=,m:y=","%":"SVGFEPointLightElement"},yH:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFESpecularLightingElement"},yI:{"^":"R;n:x=,m:y=","%":"SVGFESpotLightElement"},yJ:{"^":"R;ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFETileElement"},yK:{"^":"R;D:type=,ae:result=,n:x=,m:y=",$isj:1,"%":"SVGFETurbulenceElement"},yP:{"^":"R;n:x=,m:y=",$isj:1,"%":"SVGFilterElement"},yT:{"^":"c3;n:x=,m:y=","%":"SVGForeignObjectElement"},oo:{"^":"c3;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},c3:{"^":"R;",$isj:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},z4:{"^":"c3;n:x=,m:y=",$isj:1,"%":"SVGImageElement"},cq:{"^":"j;G:value%",$isk:1,"%":"SVGLength"},zd:{"^":"oW;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a.getItem(b)},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.cq]},
$iso:1,
$ish:1,
$ash:function(){return[P.cq]},
"%":"SVGLengthList"},oB:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.cq]},
$iso:1,
$ish:1,
$ash:function(){return[P.cq]}},oW:{"^":"oB+aa;",$isi:1,
$asi:function(){return[P.cq]},
$iso:1,
$ish:1,
$ash:function(){return[P.cq]}},zh:{"^":"R;",$isj:1,"%":"SVGMarkerElement"},zi:{"^":"R;n:x=,m:y=",$isj:1,"%":"SVGMaskElement"},pD:{"^":"j;",$ispD:1,$isk:1,"%":"SVGMatrix"},ct:{"^":"j;G:value%",$isk:1,"%":"SVGNumber"},zJ:{"^":"oX;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a.getItem(b)},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.ct]},
$iso:1,
$ish:1,
$ash:function(){return[P.ct]},
"%":"SVGNumberList"},oC:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.ct]},
$iso:1,
$ish:1,
$ash:function(){return[P.ct]}},oX:{"^":"oC+aa;",$isi:1,
$asi:function(){return[P.ct]},
$iso:1,
$ish:1,
$ash:function(){return[P.ct]}},ac:{"^":"j;",$isk:1,"%":"SVGPathSegClosePath;SVGPathSeg"},zT:{"^":"ac;br:angle=,n:x%,m:y%","%":"SVGPathSegArcAbs"},zU:{"^":"ac;br:angle=,n:x%,m:y%","%":"SVGPathSegArcRel"},zV:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoCubicAbs"},zW:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoCubicRel"},zX:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoCubicSmoothAbs"},zY:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoCubicSmoothRel"},zZ:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoQuadraticAbs"},A_:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoQuadraticRel"},A0:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoQuadraticSmoothAbs"},A1:{"^":"ac;n:x%,m:y%","%":"SVGPathSegCurvetoQuadraticSmoothRel"},A2:{"^":"ac;n:x%,m:y%","%":"SVGPathSegLinetoAbs"},A3:{"^":"ac;n:x%","%":"SVGPathSegLinetoHorizontalAbs"},A4:{"^":"ac;n:x%","%":"SVGPathSegLinetoHorizontalRel"},A5:{"^":"ac;n:x%,m:y%","%":"SVGPathSegLinetoRel"},A6:{"^":"ac;m:y%","%":"SVGPathSegLinetoVerticalAbs"},A7:{"^":"ac;m:y%","%":"SVGPathSegLinetoVerticalRel"},A8:{"^":"oY;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a.getItem(b)},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.ac]},
$iso:1,
$ish:1,
$ash:function(){return[P.ac]},
"%":"SVGPathSegList"},oD:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.ac]},
$iso:1,
$ish:1,
$ash:function(){return[P.ac]}},oY:{"^":"oD+aa;",$isi:1,
$asi:function(){return[P.ac]},
$iso:1,
$ish:1,
$ash:function(){return[P.ac]}},A9:{"^":"ac;n:x%,m:y%","%":"SVGPathSegMovetoAbs"},Aa:{"^":"ac;n:x%,m:y%","%":"SVGPathSegMovetoRel"},Ab:{"^":"R;n:x=,m:y=",$isj:1,"%":"SVGPatternElement"},Af:{"^":"j;n:x%,m:y%","%":"SVGPoint"},Ag:{"^":"j;k:length=","%":"SVGPointList"},Al:{"^":"j;n:x%,m:y%","%":"SVGRect"},Am:{"^":"oo;n:x=,m:y=","%":"SVGRectElement"},jE:{"^":"R;D:type%",$isjE:1,$isj:1,"%":"SVGScriptElement"},AK:{"^":"oZ;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a.getItem(b)},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.t]},
$iso:1,
$ish:1,
$ash:function(){return[P.t]},
"%":"SVGStringList"},oE:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.t]},
$iso:1,
$ish:1,
$ash:function(){return[P.t]}},oZ:{"^":"oE+aa;",$isi:1,
$asi:function(){return[P.t]},
$iso:1,
$ish:1,
$ash:function(){return[P.t]}},AM:{"^":"R;aG:disabled},D:type%","%":"SVGStyleElement"},tR:{"^":"ht;a",
aE:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.ab(null,null,null,P.t)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<x.length;x.length===w||(0,H.x)(x),++v){u=J.cG(x[v])
if(u.length!==0)y.F(0,u)}return y},
e0:function(a){this.a.setAttribute("class",a.c6(0," "))}},R:{"^":"W;",
geU:function(a){return new P.tR(a)},
gbh:function(a){return new P.iQ(a,new W.aN(a))},
sa9:function(a,b){this.cP(a,b)},
b5:function(a,b,c,d){var z,y,x,w,v
z=H.l([],[W.f5])
d=new W.je(z)
z.push(W.lk(null))
z.push(W.lq())
z.push(new W.uT())
c=new W.lr(d)
y='<svg version="1.1">'+b+"</svg>"
z=document.body
x=(z&&C.u).ix(z,y,c)
w=document.createDocumentFragment()
x.toString
z=new W.aN(x)
v=z.gby(z)
for(;z=v.firstChild,z!=null;)w.appendChild(z)
return w},
b4:function(a){throw H.c(new P.z("Cannot invoke click SVG."))},
bH:function(a){return a.focus()},
$isR:1,
$isH:1,
$isj:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},AO:{"^":"c3;n:x=,m:y=",$isj:1,"%":"SVGSVGElement"},AP:{"^":"R;",$isj:1,"%":"SVGSymbolElement"},kV:{"^":"c3;","%":";SVGTextContentElement"},AT:{"^":"kV;",$isj:1,"%":"SVGTextPathElement"},AU:{"^":"kV;n:x=,m:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},cv:{"^":"j;br:angle=,D:type=",$isk:1,"%":"SVGTransform"},B1:{"^":"p_;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return a.getItem(b)},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.cv]},
$iso:1,
$ish:1,
$ash:function(){return[P.cv]},
"%":"SVGTransformList"},oF:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.cv]},
$iso:1,
$ish:1,
$ash:function(){return[P.cv]}},p_:{"^":"oF+aa;",$isi:1,
$asi:function(){return[P.cv]},
$iso:1,
$ish:1,
$ash:function(){return[P.cv]}},B8:{"^":"c3;n:x=,m:y=",$isj:1,"%":"SVGUseElement"},Bc:{"^":"R;",$isj:1,"%":"SVGViewElement"},Bd:{"^":"j;",$isj:1,"%":"SVGViewSpec"},Bu:{"^":"R;",$isj:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},BA:{"^":"R;",$isj:1,"%":"SVGCursorElement"},BB:{"^":"R;",$isj:1,"%":"SVGFEDropShadowElement"},BC:{"^":"R;",$isj:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",xR:{"^":"j;k:length=","%":"AudioBuffer"},hj:{"^":"H;","%":"AnalyserNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|GainNode|JavaScriptAudioNode|MediaStreamAudioDestinationNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|StereoPannerNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},xS:{"^":"j;G:value%","%":"AudioParam"},mx:{"^":"hj;","%":"AudioBufferSourceNode|MediaElementAudioSourceNode|MediaStreamAudioSourceNode;AudioSourceNode"},xW:{"^":"hj;D:type%","%":"BiquadFilterNode"},zP:{"^":"mx;D:type%","%":"Oscillator|OscillatorNode"}}],["","",,P,{"^":"",xL:{"^":"j;B:name=,D:type=","%":"WebGLActiveInfo"},An:{"^":"j;",$isj:1,"%":"WebGL2RenderingContext"},BG:{"^":"j;",$isj:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",AI:{"^":"p0;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.a4(b,a,null,null,null))
return P.wB(a.item(b))},
i:function(a,b,c){throw H.c(new P.z("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.c(new P.z("Cannot resize immutable List."))},
gP:function(a){if(a.length>0)return a[0]
throw H.c(new P.A("No elements"))},
gU:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(new P.A("No elements"))},
N:function(a,b){return this.h(a,b)},
$isi:1,
$asi:function(){return[P.B]},
$iso:1,
$ish:1,
$ash:function(){return[P.B]},
"%":"SQLResultSetRowList"},oG:{"^":"j+Z;",$isi:1,
$asi:function(){return[P.B]},
$iso:1,
$ish:1,
$ash:function(){return[P.B]}},p0:{"^":"oG+aa;",$isi:1,
$asi:function(){return[P.B]},
$iso:1,
$ish:1,
$ash:function(){return[P.B]}}}],["","",,P,{"^":"",y2:{"^":"k;"}}],["","",,P,{"^":"",
v0:[function(a,b,c,d){var z,y
if(b===!0){z=[c]
C.e.av(z,d)
d=z}y=P.b8(J.he(d,P.x0()),!0,null)
return P.e3(H.rl(a,y))},null,null,8,0,null,30,31,32,33],
fE:function(a,b,c){var z
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(z){H.a3(z)}return!1},
lz:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},
e3:[function(a){var z
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=J.r(a)
if(!!z.$isd2)return a.a
if(!!z.$iscI||!!z.$isaA||!!z.$iseV||!!z.$isdM||!!z.$isJ||!!z.$isb0||!!z.$isfp)return a
if(!!z.$isc2)return H.aE(a)
if(!!z.$isdL)return P.ly(a,"$dart_jsFunction",new P.v9())
return P.ly(a,"_$dart_jsObject",new P.va($.$get$fD()))},"$1","lS",2,0,2,11],
ly:function(a,b,c){var z=P.lz(a,b)
if(z==null){z=c.$1(a)
P.fE(a,b,z)}return z},
fC:[function(a){var z,y
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else{if(a instanceof Object){z=J.r(a)
z=!!z.$iscI||!!z.$isaA||!!z.$iseV||!!z.$isdM||!!z.$isJ||!!z.$isb0||!!z.$isfp}else z=!1
if(z)return a
else if(a instanceof Date){y=a.getTime()
z=new P.c2(y,!1)
z.cX(y,!1)
return z}else if(a.constructor===$.$get$fD())return a.o
else return P.fI(a)}},"$1","x0",2,0,30,11],
fI:function(a){if(typeof a=="function")return P.fF(a,$.$get$dw(),new P.vi())
if(a instanceof Array)return P.fF(a,$.$get$fs(),new P.vj())
return P.fF(a,$.$get$fs(),new P.vk())},
fF:function(a,b,c){var z=P.lz(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.fE(a,b,z)}return z},
d2:{"^":"k;a",
h:["h1",function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.c(P.b3("property is not a String or num"))
return P.fC(this.a[b])}],
i:["ea",function(a,b,c){if(typeof b!=="string"&&typeof b!=="number")throw H.c(P.b3("property is not a String or num"))
this.a[b]=P.e3(c)}],
gah:function(a){return 0},
S:function(a,b){if(b==null)return!1
return b instanceof P.d2&&this.a===b.a},
v:function(a){var z,y
try{z=String(this.a)
return z}catch(y){H.a3(y)
return this.h2(this)}},
bX:function(a,b){var z,y
z=this.a
y=b==null?null:P.b8(H.l(new H.cs(b,P.lS()),[null,null]),!0,null)
return P.fC(z[a].apply(z,y))},
C:{
pu:function(a){return new P.pv(H.l(new P.uo(0,null,null,null,null),[null,null])).$1(a)}}},
pv:{"^":"a:2;a",
$1:[function(a){var z,y,x,w,v
z=this.a
if(z.H(0,a))return z.h(0,a)
y=J.r(a)
if(!!y.$isB){x={}
z.i(0,a,x)
for(z=J.a5(y.gI(a));z.l();){w=z.gp()
x[w]=this.$1(y.h(a,w))}return x}else if(!!y.$ish){v=[]
z.i(0,a,v)
C.e.av(v,y.bk(a,this))
return v}else return P.e3(a)},null,null,2,0,null,11,"call"]},
po:{"^":"d2;a",
ic:function(a,b){var z,y
z=P.e3(b)
y=P.b8(H.l(new H.cs(a,P.lS()),[null,null]),!0,null)
return P.fC(this.a.apply(z,y))},
eO:function(a){return this.ic(a,null)}},
j3:{"^":"pt;a",
h:function(a,b){var z
if(typeof b==="number"&&b===C.a.aq(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gk(this)
else z=!1
if(z)H.F(P.ao(b,0,this.gk(this),null,null))}return this.h1(this,b)},
i:function(a,b,c){var z
if(typeof b==="number"&&b===C.a.aq(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gk(this)
else z=!1
if(z)H.F(P.ao(b,0,this.gk(this),null,null))}this.ea(this,b,c)},
gk:function(a){var z=this.a.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.c(new P.A("Bad JsArray length"))},
sk:function(a,b){this.ea(this,"length",b)},
F:function(a,b){this.bX("push",[b])}},
pt:{"^":"d2+Z;",$isi:1,$asi:null,$iso:1,$ish:1,$ash:null},
v9:{"^":"a:2;",
$1:function(a){var z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.v0,a,!1)
P.fE(z,$.$get$dw(),a)
return z}},
va:{"^":"a:2;a",
$1:function(a){return new this.a(a)}},
vi:{"^":"a:2;",
$1:function(a){return new P.po(a)}},
vj:{"^":"a:2;",
$1:function(a){return H.l(new P.j3(a),[null])}},
vk:{"^":"a:2;",
$1:function(a){return new P.d2(a)}}}],["","",,P,{"^":"",
a0:function(a,b){var z
if(typeof a!=="number")throw H.c(P.b3(a))
if(typeof b!=="number")throw H.c(P.b3(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0)z=b===0?1/b<0:b<0
else z=!1
if(z||isNaN(b))return b
return a}return a},
S:function(a,b){var z
if(typeof a!=="number")throw H.c(P.b3(a))
if(typeof b!=="number")throw H.c(P.b3(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0)z=a===0?1/a<0:a<0
else z=!1
if(z)return b
return a},
uE:{"^":"k;"},
aM:{"^":"uE;",$asaM:null}}],["","",,H,{"^":"",
lv:function(a){return a},
v5:function(a,b,c){var z
if(!(a>>>0!==a))z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.c(H.wG(a,b,c))
return b},
f2:{"^":"j;",
gaf:function(a){return C.X},
$isf2:1,
$ishn:1,
"%":"ArrayBuffer"},
d4:{"^":"j;",$isd4:1,$isb0:1,"%":";ArrayBufferView;f3|j9|jb|f4|ja|jc|bM"},
zu:{"^":"d4;",
gaf:function(a){return C.Y},
$isb0:1,
"%":"DataView"},
f3:{"^":"d4;",
gk:function(a){return a.length},
$isQ:1,
$asQ:I.aI,
$isO:1,
$asO:I.aI},
f4:{"^":"jb;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
i:function(a,b,c){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
a[b]=c}},
j9:{"^":"f3+Z;",$isi:1,
$asi:function(){return[P.aC]},
$iso:1,
$ish:1,
$ash:function(){return[P.aC]}},
jb:{"^":"j9+iR;"},
bM:{"^":"jc;",
i:function(a,b,c){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]}},
ja:{"^":"f3+Z;",$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]}},
jc:{"^":"ja+iR;"},
zv:{"^":"f4;",
gaf:function(a){return C.Z},
$isb0:1,
$isi:1,
$asi:function(){return[P.aC]},
$iso:1,
$ish:1,
$ash:function(){return[P.aC]},
"%":"Float32Array"},
zw:{"^":"f4;",
gaf:function(a){return C.a_},
$isb0:1,
$isi:1,
$asi:function(){return[P.aC]},
$iso:1,
$ish:1,
$ash:function(){return[P.aC]},
"%":"Float64Array"},
zx:{"^":"bM;",
gaf:function(a){return C.a0},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
$isb0:1,
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]},
"%":"Int16Array"},
zy:{"^":"bM;",
gaf:function(a){return C.a1},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
$isb0:1,
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]},
"%":"Int32Array"},
zz:{"^":"bM;",
gaf:function(a){return C.a2},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
$isb0:1,
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]},
"%":"Int8Array"},
zA:{"^":"bM;",
gaf:function(a){return C.a6},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
$isb0:1,
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]},
"%":"Uint16Array"},
zB:{"^":"bM;",
gaf:function(a){return C.a7},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
$isb0:1,
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]},
"%":"Uint32Array"},
zC:{"^":"bM;",
gaf:function(a){return C.a8},
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
$isb0:1,
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
zD:{"^":"bM;",
gaf:function(a){return C.a9},
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.at(a,b))
return a[b]},
$isb0:1,
$isi:1,
$asi:function(){return[P.E]},
$iso:1,
$ish:1,
$ash:function(){return[P.E]},
"%":";Uint8Array"}}],["","",,H,{"^":"",
fR:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
wB:function(a){var z,y,x,w,v
if(a==null)return
z=P.as()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.x)(y),++w){v=y[w]
z.i(0,v,a[v])}return z},
wy:function(a){var z=H.l(new P.lc(H.l(new P.aO(0,$.M,null),[null])),[null])
a.then(H.b2(new P.wz(z),1))["catch"](H.b2(new P.wA(z),1))
return z.a},
nk:function(){var z=$.hv
if(z==null){z=J.h_(window.navigator.userAgent,"Opera",0)
$.hv=z}return z},
hx:function(){var z=$.hw
if(z==null){z=P.nk()!==!0&&J.h_(window.navigator.userAgent,"WebKit",0)
$.hw=z}return z},
uQ:{"^":"k;a_:a>",
c2:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
b8:function(a){var z,y,x,w,v,u
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.r(a)
if(!!y.$isc2)return new Date(a.a)
if(!!y.$isrr)throw H.c(new P.db("structured clone of RegExp"))
if(!!y.$isaW)return a
if(!!y.$iscI)return a
if(!!y.$isiP)return a
if(!!y.$isdM)return a
if(!!y.$isf2||!!y.$isd4)return a
if(!!y.$isB){x=this.c2(a)
w=this.b
v=w.length
if(x>=v)return H.b(w,x)
u=w[x]
z.a=u
if(u!=null)return u
u={}
z.a=u
if(x>=v)return H.b(w,x)
w[x]=u
y.V(a,new P.uS(z,this))
return z.a}if(!!y.$isi){x=this.c2(a)
z=this.b
if(x>=z.length)return H.b(z,x)
u=z[x]
if(u!=null)return u
return this.iw(a,x)}throw H.c(new P.db("structured clone of other type"))},
iw:function(a,b){var z,y,x,w,v
z=J.N(a)
y=z.gk(a)
x=new Array(y)
w=this.b
if(b>=w.length)return H.b(w,b)
w[b]=x
for(v=0;v<y;++v){w=this.b8(z.h(a,v))
if(v>=x.length)return H.b(x,v)
x[v]=w}return x}},
uS:{"^":"a:1;a,b",
$2:function(a,b){this.a.a[a]=this.b.b8(b)}},
tJ:{"^":"k;a_:a>",
c2:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
b8:function(a){var z,y,x,w,v,u,t,s,r
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
z=new P.c2(y,!0)
z.cX(y,!0)
return z}if(a instanceof RegExp)throw H.c(new P.db("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.wy(a)
x=Object.getPrototypeOf(a)
if(x===Object.prototype||x===null){w=this.c2(a)
v=this.b
u=v.length
if(w>=u)return H.b(v,w)
t=v[w]
z.a=t
if(t!=null)return t
t=P.as()
z.a=t
if(w>=u)return H.b(v,w)
v[w]=t
this.iY(a,new P.tK(z,this))
return z.a}if(a instanceof Array){w=this.c2(a)
z=this.b
if(w>=z.length)return H.b(z,w)
t=z[w]
if(t!=null)return t
v=J.N(a)
s=v.gk(a)
t=this.c?new Array(s):a
if(w>=z.length)return H.b(z,w)
z[w]=t
if(typeof s!=="number")return H.C(s)
z=J.bp(t)
r=0
for(;r<s;++r)z.i(t,r,this.b8(v.h(a,r)))
return t}return a}},
tK:{"^":"a:1;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.b8(b)
J.m3(z,a,y)
return y}},
uR:{"^":"uQ;a,b"},
fq:{"^":"tJ;a,b,c",
iY:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.x)(z),++x){w=z[x]
b.$2(w,a[w])}}},
wz:{"^":"a:2;a",
$1:[function(a){return this.a.eW(0,a)},null,null,2,0,null,12,"call"]},
wA:{"^":"a:2;a",
$1:[function(a){return this.a.eX(a)},null,null,2,0,null,12,"call"]},
ht:{"^":"k;",
dj:function(a){if($.$get$hu().b.test(H.b1(a)))return a
throw H.c(P.ds(a,"value","Not a valid class token"))},
v:function(a){return this.aE().c6(0," ")},
gA:function(a){var z=this.aE()
z=H.l(new P.bX(z,z.r,null,null),[null])
z.c=z.a.e
return z},
V:function(a,b){this.aE().V(0,b)},
bk:function(a,b){var z=this.aE()
return H.l(new H.ez(z,b),[H.ah(z,0),null])},
gR:function(a){return this.aE().a===0},
gk:function(a){return this.aE().a},
M:function(a,b){if(typeof b!=="string")return!1
this.dj(b)
return this.aE().M(0,b)},
dJ:function(a){return this.M(0,a)?a:null},
F:function(a,b){this.dj(b)
return this.jk(0,new P.mX(b))},
ad:function(a,b){var z,y
this.dj(b)
z=this.aE()
y=z.ad(0,b)
this.e0(z)
return y},
gP:function(a){var z=this.aE()
return z.gP(z)},
gU:function(a){var z=this.aE()
return z.gU(z)},
N:function(a,b){return this.aE().N(0,b)},
jk:function(a,b){var z,y
z=this.aE()
y=b.$1(z)
this.e0(z)
return y},
$iso:1,
$ish:1,
$ash:function(){return[P.t]}},
mX:{"^":"a:2;a",
$1:function(a){return a.F(0,this.a)}},
iQ:{"^":"cr;a,b",
gbo:function(){var z=this.b
z=z.bK(z,new P.oj())
return H.bJ(z,new P.ok(),H.ag(z,"h",0),null)},
V:function(a,b){C.e.V(P.b8(this.gbo(),!1,W.W),b)},
i:function(a,b,c){var z=this.gbo()
J.mn(z.aJ(J.dj(z.a,b)),c)},
sk:function(a,b){var z=J.al(this.gbo().a)
if(b>=z)return
else if(b<0)throw H.c(P.b3("Invalid list length"))
this.jx(0,b,z)},
F:function(a,b){this.b.a.appendChild(b)},
M:function(a,b){return!1},
jx:function(a,b,c){var z=this.gbo()
z=H.t6(z,b,H.ag(z,"h",0))
C.e.V(P.b8(H.tv(z,c-b,H.ag(z,"h",0)),!0,null),new P.ol())},
gk:function(a){return J.al(this.gbo().a)},
h:function(a,b){var z=this.gbo()
return z.aJ(J.dj(z.a,b))},
gA:function(a){var z=P.b8(this.gbo(),!1,W.W)
return H.l(new J.cH(z,z.length,0,null),[H.ah(z,0)])},
$ascr:function(){return[W.W]},
$asdP:function(){return[W.W]},
$asi:function(){return[W.W]},
$ash:function(){return[W.W]}},
oj:{"^":"a:2;",
$1:function(a){return!!J.r(a).$isW}},
ok:{"^":"a:2;",
$1:[function(a){return H.q(a,"$isW")},null,null,2,0,null,24,"call"]},
ol:{"^":"a:2;",
$1:function(a){return J.aL(a)}}}]]
setupProgram(dart,0)
J.r=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.iZ.prototype
return J.iY.prototype}if(typeof a=="string")return J.d0.prototype
if(a==null)return J.j_.prototype
if(typeof a=="boolean")return J.pk.prototype
if(a.constructor==Array)return J.cp.prototype
if(typeof a!="object"){if(typeof a=="function")return J.d1.prototype
return a}if(a instanceof P.k)return a
return J.e6(a)}
J.lM=function(a){if(a==null)return a
if(a.constructor==Array)return J.cp.prototype
if(!(a instanceof P.k))return J.cw.prototype
return a}
J.N=function(a){if(typeof a=="string")return J.d0.prototype
if(a==null)return a
if(a.constructor==Array)return J.cp.prototype
if(typeof a!="object"){if(typeof a=="function")return J.d1.prototype
return a}if(a instanceof P.k)return a
return J.e6(a)}
J.bp=function(a){if(a==null)return a
if(a.constructor==Array)return J.cp.prototype
if(typeof a!="object"){if(typeof a=="function")return J.d1.prototype
return a}if(a instanceof P.k)return a
return J.e6(a)}
J.Y=function(a){if(typeof a=="number")return J.d_.prototype
if(a==null)return a
if(!(a instanceof P.k))return J.cw.prototype
return a}
J.a_=function(a){if(typeof a=="number")return J.d_.prototype
if(typeof a=="string")return J.d0.prototype
if(a==null)return a
if(!(a instanceof P.k))return J.cw.prototype
return a}
J.aP=function(a){if(typeof a=="string")return J.d0.prototype
if(a==null)return a
if(!(a instanceof P.k))return J.cw.prototype
return a}
J.f=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.d1.prototype
return a}if(a instanceof P.k)return a
return J.e6(a)}
J.G=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.a_(a).t(a,b)}
J.m1=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.Y(a).fD(a,b)}
J.bf=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.Y(a).aM(a,b)}
J.y=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.r(a).S(a,b)}
J.fV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.Y(a).bL(a,b)}
J.a6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.Y(a).ak(a,b)}
J.fW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.Y(a).cN(a,b)}
J.bq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.Y(a).aN(a,b)}
J.u=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.a_(a).Y(a,b)}
J.fX=function(a){if(typeof a=="number")return-a
return J.Y(a).ci(a)}
J.fY=function(a,b){return J.Y(a).fQ(a,b)}
J.ee=function(a,b){return J.Y(a).e6(a,b)}
J.T=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.Y(a).ac(a,b)}
J.m2=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a^b)>>>0
return J.Y(a).h7(a,b)}
J.ad=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.lQ(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.N(a).h(a,b)}
J.m3=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.lQ(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.bp(a).i(a,b,c)}
J.m4=function(a,b){return J.f(a).ht(a,b)}
J.a7=function(a,b,c,d){return J.f(a).L(a,b,c,d)}
J.m5=function(a,b){return J.f(a).d1(a,b)}
J.m6=function(a,b){return J.f(a).hY(a,b)}
J.ef=function(a,b,c,d){return J.f(a).hZ(a,b,c,d)}
J.m7=function(a,b,c){return J.f(a).i_(a,b,c)}
J.eg=function(a){return J.Y(a).dk(a)}
J.p=function(a,b){return J.bp(a).F(a,b)}
J.fZ=function(a,b){return J.aP(a).dl(a,b)}
J.m8=function(a,b,c,d,e,f){return J.f(a).aB(a,b,c,d,e,f)}
J.eh=function(a){return J.f(a).Z(a)}
J.br=function(a){return J.f(a).an(a)}
J.m9=function(a,b,c){return J.Y(a).ds(a,b,c)}
J.aS=function(a,b,c,d,e){return J.f(a).ik(a,b,c,d,e)}
J.bZ=function(a,b){return J.a_(a).aS(a,b)}
J.aT=function(a,b){return J.N(a).M(a,b)}
J.h_=function(a,b,c){return J.N(a).f_(a,b,c)}
J.h0=function(a){return J.f(a).ay(a)}
J.h1=function(a,b,c,d){return J.f(a).b5(a,b,c,d)}
J.ma=function(a,b,c,d,e){return J.f(a).iy(a,b,c,d,e)}
J.mb=function(a,b,c,d,e,f,g){return J.f(a).iz(a,b,c,d,e,f,g)}
J.dj=function(a,b){return J.bp(a).N(a,b)}
J.h2=function(a,b){return J.aP(a).f5(a,b)}
J.c_=function(a,b,c,d){return J.f(a).bG(a,b,c,d)}
J.ei=function(a){return J.Y(a).iX(a)}
J.cc=function(a,b){return J.bp(a).V(a,b)}
J.c0=function(a){return J.f(a).gax(a)}
J.cE=function(a){return J.f(a).gdn(a)}
J.h3=function(a){return J.f(a).gie(a)}
J.mc=function(a){return J.f(a).gbh(a)}
J.dk=function(a){return J.f(a).geU(a)}
J.h4=function(a){return J.f(a).gcA(a)}
J.cd=function(a){return J.f(a).gaL(a)}
J.md=function(a){return J.f(a).gaU(a)}
J.h5=function(a){return J.bp(a).gP(a)}
J.bg=function(a){return J.r(a).gah(a)}
J.ej=function(a){return J.f(a).ga6(a)}
J.dl=function(a){return J.N(a).gR(a)}
J.a5=function(a){return J.bp(a).gA(a)}
J.h6=function(a){return J.f(a).gI(a)}
J.h7=function(a){return J.bp(a).gU(a)}
J.h8=function(a){return J.f(a).gfg(a)}
J.al=function(a){return J.N(a).gk(a)}
J.am=function(a){return J.f(a).gB(a)}
J.h9=function(a){return J.f(a).gbv(a)}
J.me=function(a){return J.f(a).gjn(a)}
J.mf=function(a){return J.f(a).gjo(a)}
J.ha=function(a){return J.f(a).gaA(a)}
J.mg=function(a){return J.f(a).gdP(a)}
J.ek=function(a){return J.f(a).gae(a)}
J.mh=function(a){return J.r(a).gaf(a)}
J.hb=function(a){return J.f(a).gjG(a)}
J.a9=function(a){return J.f(a).gaX(a)}
J.dm=function(a){return J.f(a).gD(a)}
J.cF=function(a){return J.f(a).gG(a)}
J.el=function(a){return J.f(a).ga_(a)}
J.bh=function(a){return J.f(a).as(a)}
J.a8=function(a,b){return J.f(a).E(a,b)}
J.em=function(a,b){return J.f(a).fF(a,b)}
J.hc=function(a,b){return J.N(a).bI(a,b)}
J.mi=function(a,b){return J.N(a).cF(a,b)}
J.hd=function(a,b,c){return J.f(a).T(a,b,c)}
J.mj=function(a,b){return J.f(a).aa(a,b)}
J.he=function(a,b){return J.bp(a).bk(a,b)}
J.mk=function(a,b,c){return J.aP(a).dK(a,b,c)}
J.hf=function(a,b,c){return J.f(a).ab(a,b,c)}
J.ml=function(a,b){return J.r(a).dL(a,b)}
J.aL=function(a){return J.bp(a).bJ(a)}
J.dn=function(a,b,c){return J.aP(a).jA(a,b,c)}
J.mm=function(a,b,c){return J.aP(a).jB(a,b,c)}
J.mn=function(a,b){return J.f(a).jC(a,b)}
J.bA=function(a){return J.Y(a).cK(a)}
J.hg=function(a,b,c){return J.f(a).aY(a,b,c)}
J.mo=function(a,b,c,d){return J.f(a).X(a,b,c,d)}
J.ce=function(a,b){return J.f(a).bl(a,b)}
J.mp=function(a,b){return J.f(a).sax(a,b)}
J.en=function(a,b){return J.f(a).sbs(a,b)}
J.bB=function(a,b){return J.f(a).saU(a,b)}
J.mq=function(a,b){return J.f(a).sbi(a,b)}
J.eo=function(a,b){return J.f(a).sj9(a,b)}
J.aq=function(a,b){return J.f(a).sa9(a,b)}
J.mr=function(a,b){return J.f(a).sbv(a,b)}
J.bC=function(a,b){return J.f(a).scT(a,b)}
J.ms=function(a,b){return J.f(a).sdV(a,b)}
J.mt=function(a,b){return J.f(a).sD(a,b)}
J.mu=function(a,b){return J.f(a).sG(a,b)}
J.hh=function(a,b){return J.aP(a).fS(a,b)}
J.dp=function(a,b){return J.aP(a).cS(a,b)}
J.ep=function(a){return J.f(a).a3(a)}
J.dq=function(a,b){return J.aP(a).bc(a,b)}
J.mv=function(a,b,c){return J.aP(a).bd(a,b,c)}
J.ay=function(a){return J.Y(a).j(a)}
J.mw=function(a){return J.aP(a).jI(a)}
J.aU=function(a){return J.r(a).v(a)}
J.eq=function(a,b){return J.Y(a).ce(a,b)}
J.cG=function(a){return J.aP(a).jK(a)}
J.er=function(a){return J.f(a).a1(a)}
I.bz=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.u=W.es.prototype
C.v=W.mY.prototype
C.I=W.oi.prototype
C.J=J.j.prototype
C.e=J.cp.prototype
C.d=J.iY.prototype
C.c=J.iZ.prototype
C.x=J.j_.prototype
C.a=J.d_.prototype
C.f=J.d0.prototype
C.Q=J.d1.prototype
C.U=W.qy.prototype
C.V=J.rj.prototype
C.ae=J.cw.prototype
C.C=new H.hz()
C.D=new P.qD()
C.E=new P.tG()
C.F=new P.tZ()
C.h=new P.uF()
C.w=new P.bk(0)
C.G=H.l(new W.iA("error"),[W.aA])
C.H=H.l(new W.iA("success"),[W.aA])
C.n=new S.aY(6,"rgba(100,100,255,0.15)","rgba(150,150,30,0.9)","Cannonboost base","plus","WEAPON_IN",null)
C.k=new S.aY(5,"rgba(255,255,0,0.15)","rgba(255,255,0,0.9)","Boostable cannon","plus-sign","WEAPON_OUT",null)
C.l=new S.aY(3,"rgba(100,100,255,0.15)","rgba(80,80,200,0.9)","Thruster base","arrow-right","THRUSTER_IN",null)
C.i=new S.aY(0,"rgba(255,255,0,0.15)","rgba(200,30,30,0.9)","Launcher","log-out","LAUNCHER",null)
C.j=new S.aY(8,"rgba(100,100,255,0.15)","rgba(120,0,0,0.9)","Missile base","plane","MISSILE",null)
C.m=new S.aY(4,"rgba(255,255,0,0.15)","rgba(150,150,255,0.9)","Thruster head","share-alt","THRUSTER_OUT",null)
C.b=new S.aY(2,"rgba(255,255,255,0.15)","rgba(255,255,255,0.9)","Connector","link","NORMAL",null)
C.o=new S.aY(7,"rgba(255,255,0,0.15)","rgba(30,255,30,0.9)","Root","tree-conifer","ROOT",null)
C.K=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.y=function(hooks) { return hooks; }
C.L=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.M=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.N=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.O=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.z=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.P=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.R=H.l(I.bz(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.t])
C.q=I.bz([0,0,26498,1023,65534,34815,65534,18431])
C.S=I.bz(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.r=I.bz([])
C.A=H.l(I.bz(["bind","if","ref","repeat","syntax"]),[P.t])
C.t=H.l(I.bz(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.t])
C.T=H.l(I.bz([]),[P.cu])
C.B=H.l(new H.mV(0,{},C.T),[P.cu,null])
C.W=new H.fl("call")
C.X=H.av("hn")
C.Y=H.av("xZ")
C.Z=H.av("yQ")
C.a_=H.av("yR")
C.a0=H.av("z5")
C.a1=H.av("z6")
C.a2=H.av("z7")
C.a3=H.av("j0")
C.a4=H.av("qB")
C.a5=H.av("t")
C.a6=H.av("B3")
C.a7=H.av("B4")
C.a8=H.av("B5")
C.a9=H.av("B6")
C.aa=H.av("bc")
C.ab=H.av("aC")
C.ac=H.av("E")
C.ad=H.av("aR")
C.p=new P.tF(!1)
$.aH=null
$.bx=null
$.by=null
$.dD=null
$.dE=null
$.dF=null
$.d=0
$.f0="rwdk"
$.be=null
$.cb=null
$.e4=null
$.jw="$cachedFunction"
$.jx="$cachedInvocation"
$.bj=0
$.cg=null
$.hl=null
$.fO=null
$.lG=null
$.lW=null
$.e5=null
$.e8=null
$.fP=null
$.c8=null
$.cy=null
$.cz=null
$.fG=!1
$.M=C.h
$.iF=0
$.bD=null
$.eA=null
$.hB=null
$.hA=null
$.hv=null
$.hw=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["i9","$get$i9",function(){return S.eD("ENABLED","Explode on contact",null,"")},"ib","$get$ib",function(){return S.eD("PROXIMITY","Explode when targets are near",null,"")},"ia","$get$ia",function(){return S.eD("FINAL","Explode on contact and expiration",null,"")},"cP","$get$cP",function(){return[$.$get$i9(),$.$get$ib(),$.$get$ia()]},"iw","$get$iw",function(){var z=S.eJ("0","Cannot be unlocked for play. NPC only.",null,"")
z.b="Not playable"
return z},"iu","$get$iu",function(){var z=S.eJ("1","Unlockable when killing a ship of the faction worth more than 1000P.",null,"")
z.b="Unlockable"
return z},"iv","$get$iv",function(){var z=S.eJ("2","Available to players immediately without having to unlock.",null,"")
z.b="Always unlocked"
return z},"eK","$get$eK",function(){return[$.$get$iw(),$.$get$iu(),$.$get$iv()]},"is","$get$is",function(){var z=S.dB("0","Green plants, randomly generated by the game",null,"")
z.b="Green plants"
return z},"iq","$get$iq",function(){var z=S.dB("1","Blue plants, randomly generated by the game",null,"")
z.b="Blue plants"
return z},"it","$get$it",function(){var z=S.dB("2","Pink plants, randomly generated by the game",null,"")
z.b="Pink plants"
return z},"ir","$get$ir",function(){var z=S.dB("-1","Designs sourced from the controlling faction which contain a root or seed block (e.g. bee city buildings, borg block structures, the spikey plants)",null,"")
z.b="Faction structures"
return z},"eI","$get$eI",function(){return[$.$get$is(),$.$get$iq(),$.$get$it(),$.$get$ir()]},"iz","$get$iz",function(){var z=S.eL("0","Regions where each point is assigned to the cell with the closest centre point",null,"")
z.b="Voronoi regions"
return z},"iy","$get$iy",function(){var z=S.eL("1","Irregular blob regions",null,"")
z.b="Splats"
return z},"ix","$get$ix",function(){var z=S.eL("2","Circular regions",null,"")
z.b="Circles"
return z},"eM","$get$eM",function(){return[$.$get$iz(),$.$get$iy(),$.$get$ix()]},"hL","$get$hL",function(){var z=S.cN("1","Left mouse button. Default for cannons/lasers.",null,"")
z.b="Left click"
return z},"hO","$get$hO",function(){var z=S.cN("2","Right mouse button. Default for launchers.",null,"")
z.b="Right click"
return z},"hM","$get$hM",function(){var z=S.cN("3","Middle mouse button. Not a default binding for anything. Defaults to ripple fire mode.",null,"")
z.b="Middle click"
return z},"hK","$get$hK",function(){var z=S.cN("4","Automatic targeting. Targets enemies you are aiming at or have locked. Not a default binding for anything.",null,"")
z.b="Autofire"
return z},"hN","$get$hN",function(){var z=S.cN("5","Point defence. Targets incoming destroyable projectiles first, then other enemies. Default for any weapon with the AUTOFIRE feature.",null,"")
z.b="Point defence"
return z},"eC","$get$eC",function(){return[$.$get$hL(),$.$get$hM(),$.$get$hO(),$.$get$hK(),$.$get$hN()]},"hY","$get$hY",function(){return S.ak("METAMORPHOSIS","Ships with this tag will occasionally change design at their discretion.","random","NPC ships may change design")},"hU","$get$hU",function(){return S.ak("FLOCKING","Ships with this tag will tend to travel in groups, aligning their direction of travel.","th","Flocking behaviour")},"i2","$get$i2",function(){return S.ak("RECKLESS","Ships with this tag will flee less from combat.","exclamation-sign","Reckless AI")},"hP","$get$hP",function(){return S.ak("AGGRESSIVE","Ships with this tag are more eager to attack enemy targets.","fire","Aggressive AI")},"hS","$get$hS",function(){return S.ak("CAUTIOUS","Ships with this tag are less eager to attack enemy targets.","question-sign","Cautious AI")},"i5","$get$i5",function(){return S.ak("SOCIAL","Ships with this tag will call for help when under attack.","volume-up","Calls for help")},"i0","$get$i0",function(){return S.ak("PEACEFUL","Ships with this tag will not attack without provocation.","grain","Peaceful AI")},"i8","$get$i8",function(){return S.ak("WANDER","Ships with this tag will wander randomly in their spare time.","transfer","Wanders")},"hW","$get$hW",function(){return S.ak("HATES_PLANTS","Ships with this tag will attempt to kill plants if in range.","tree-conifer","Hates plants")},"hV","$get$hV",function(){return S.ak("FORGIVING","Ships with this tag will stop attacking more readily.","ok-circle","Forgiving AI")},"i7","$get$i7",function(){return S.ak("TRACTOR_TRANSIENT","Ships with this tag will collect spare blocks from wreckage to use.","repeat","NPC ships will reuse wrecked parts")},"hT","$get$hT",function(){return S.ak("DODGES","Ships with this tag will attempt to avoid projectiles if possible.","resize-horizontal","Will attempt to dodge projectiles")},"i3","$get$i3",function(){return S.ak("RIPPLE_FIRE","Ships with this tag will use ripple fire when firing their weapons.","equalizer","Uses ripple fire")},"i6","$get$i6",function(){return S.ak("SPREAD_FIRE","Ships with this tag will spread their fire around when attacking.","fullscreen","Uses spread fire")},"hR","$get$hR",function(){return S.ak("BAD_AIM","Ships with this tag are poor shots and will miss more often.","remove","Poor aim")},"i1","$get$i1",function(){return S.ak("POINT_DEFENSE","Ships with this tag will act as point defence drones.","record","Will act as point defence drones")},"hX","$get$hX",function(){return S.ak("INACTIVE","Ships with this tag will take no action at all. Not recommended.","ban-circle warning","")},"i4","$get$i4",function(){return S.ak("SMART_FIRE","Ships with this tag will spread their fire if the enemy is expected to dodge.","screenshot","Will attempt to spread fire if enemy dodges")},"i_","$get$i_",function(){return S.ak("NO_PARENT","Ships with this tag will not follow their parent. Particularly good for seed launchers.","home","Will not follow parent ships")},"hQ","$get$hQ",function(){return S.ak("ATTACK","Ships with this tag will blindly attack targets as if they were in tournament mode. Prevents most normal behaviour. Not recommended.","alert warningminor","Will attack enemies at any opportunity")},"hZ","$get$hZ",function(){return S.ak("MUTATE","Ships with this tag will deviate from their blueprint, randomly changing some blocks each generation. Experimental - use at your own risk.","refresh warningminor","Mutates between generations")},"cO","$get$cO",function(){return[$.$get$hY(),$.$get$hU(),$.$get$i2(),$.$get$hP(),$.$get$hS(),$.$get$i5(),$.$get$i0(),$.$get$i8(),$.$get$hW(),$.$get$hV(),$.$get$i7(),$.$get$hT(),$.$get$i3(),$.$get$i6(),$.$get$hR(),$.$get$i1(),$.$get$hX(),$.$get$i4(),$.$get$i_(),$.$get$hQ(),$.$get$hZ()]},"cQ","$get$cQ",function(){return S.V("COMMAND","This block is a command module. Enables the command settings section.","star","Command")},"bG","$get$bG",function(){return S.V("THRUSTER","This block is a thruster.","arrow-right","Thruster")},"ck","$get$ck",function(){return S.V("GENERATOR","This blocks generates or stores power.","flash","Generator")},"cm","$get$cm",function(){return S.V("TURRET","Turreted weapon. Must be used with CANNON or LASER.","play-circle","Turreted")},"ci","$get$ci",function(){return S.V("CANNON","Projectile weapon. Enables the cannon settings section.","screenshot","Cannon")},"cl","$get$cl",function(){return S.V("LASER","Beam weapon. Enables the laser settings section.","screenshot","Laser")},"cT","$get$cT",function(){return S.V("SHIELD","Projects a round shield for blocking enemy fire. Enables the shield settings section.","record","Shield Generator")},"eH","$get$eH",function(){return S.V("TORQUER","Provides torque to let ships rotate without levering thrust.","repeat","Torquer")},"aV","$get$aV",function(){return S.V("LAUNCHER","Generates launchable blocks - missiles, seeds, mines, drones. Enables the replicateBlock section.","log-out","Launcher")},"cR","$get$cR",function(){return S.V("EXPLODE","Explodes on contact with enemies.",null,"")},"ic","$get$ic",function(){return S.V("ASSEMBLER","Allows the ship to regenerate and collect missing blocks from wreckage.",null,"")},"il","$get$il",function(){return S.V("REGROWER","Allows the ship to regenerate missing parts but NOT collect them from wreckage.",null,"")},"dx","$get$dx",function(){return S.V("CANNON_BOOST","Modifies attached cannon blocks. Enables the cannon_boost settings section.","plus-sign","Cannon Booster")},"eF","$get$eF",function(){return S.V("INVULNERABLE","Makes the block totally indestructible. NOT RECOMMENDED.","exclamation-sign warning","Invulnerable")},"ik","$get$ik",function(){return S.V("NOREGEN","Prevents the block from regenerating health or being replaced.",null,"")},"ig","$get$ig",function(){return S.V("ENVIRONMENTAL","Allows plants and other ROOT blocks to attach and grow.","tree-conifer","Environmental")},"cU","$get$cU",function(){return S.V("TRACTOR","Collects R packets.","magnet","Resource Collector")},"im","$get$im",function(){return S.V("ROOT","Can attach to asteroids and blocks marked ENVIRONMENTAL.",null,"")},"cS","$get$cS",function(){return S.V("PHOTOSYNTH","Generates resources over time.","leaf","Resource Generator")},"ih","$get$ih",function(){return S.V("FREERES","Does not drop resources when destroyed. Good for missiles and drones.",null,"")},"dy","$get$dy",function(){return S.V("FACTORY","Allows construction of other ships.","cog","Factory")},"bF","$get$bF",function(){return S.V("SEED","Can plant on ENVIRONMENTAL blocks and asteroids. Will thrust if also a THRUSTER. Enables the command settings section.",null,"")},"cj","$get$cj",function(){return S.V("CHARGING","Weapon must be charged before firing. Requires CANNON or LASER.",null,"")},"dz","$get$dz",function(){return S.V("MELEE","Does additional damage on contact with enemy blocks.","tint","Additional Melee Damage")},"io","$get$io",function(){return S.V("SELFFACTORY","Allows construction of ships, but only of the same blueprint.","cog","Self-Factory")},"ij","$get$ij",function(){return S.V("NOCLIP","Does not collide with objects.","random","Does not collide")},"eE","$get$eE",function(){return S.V("INVISIBLE","Does not render the block shape. Still renders turrets and shields.","eye-close warningminor","Invisible")},"eG","$get$eG",function(){return S.V("TELEPORTER","Allows the ship to teleport at a cost of energy per unit mass.","transfer","Teleporter")},"ie","$get$ie",function(){return S.V("DEACTIVATES","Deactivates instead of being destroyed. NOT RECOMMENDED.","exclamation-sign warning","Deactivates instead of being destroyed")},"ip","$get$ip",function(){return S.V("TELESPAWN","Like FACTORY, but created ships will teleport in fully built, for free. Requires a factory block on the ship to function. NOT RECOMMENDED.","cog warning","Teleport Factory")},"id","$get$id",function(){return S.V("AUTOFIRE","Weapon is bound to point defence by default and will be used as such by AI.",null,"")},"ii","$get$ii",function(){return S.V("INTLINES","Draws lines between adjacent blocks.",null,"")},"dA","$get$dA",function(){return[$.$get$cQ(),$.$get$bG(),$.$get$ck(),$.$get$cm(),$.$get$ci(),$.$get$cl(),$.$get$cT(),$.$get$eH(),$.$get$aV(),$.$get$cR(),$.$get$ic(),$.$get$il(),$.$get$dx(),$.$get$eF(),$.$get$ik(),$.$get$ig(),$.$get$cU(),$.$get$im(),$.$get$cS(),$.$get$ih(),$.$get$dy(),$.$get$bF(),$.$get$cj(),$.$get$dz(),$.$get$io(),$.$get$ij(),$.$get$eE(),$.$get$eG(),$.$get$ie(),$.$get$ip(),$.$get$id(),$.$get$ii()]},"hC","$get$hC",function(){return S.bE("EXPLOSIVE","Red shapes which explode on contact",null,"")},"hF","$get$hF",function(){return S.bE("PENROSE","Penrose rhombus asteroid parts",null,"")},"hG","$get$hG",function(){return S.bE("SQUARE","Square asteroid parts",null,"")},"hD","$get$hD",function(){return S.bE("HEXAGON","Hexagonal asteroid parts",null,"")},"hH","$get$hH",function(){return S.bE("TRIANGLE","Triangular asteroid parts",null,"")},"hE","$get$hE",function(){return S.bE("OCTAGON","Octagonal asteroid parts",null,"")},"hI","$get$hI",function(){return S.bE("UNIFORM_SIZE","?",null,"")},"hJ","$get$hJ",function(){return S.bE("UNIFORM_TYPE","?",null,"")},"eB","$get$eB",function(){return[$.$get$hC(),$.$get$hF(),$.$get$hG(),$.$get$hD(),$.$get$hH(),$.$get$hE(),$.$get$hI(),$.$get$hJ()]},"m","$get$m",function(){return H.j4(P.E,S.X)},"jg","$get$jg",function(){return P.au('\\b([\\w|\\.]+)\\b[\\s\\n\\r]*=[\\s\\n\\r]*([^",;{}\\n\\r]+),*',!0,!1)},"jm","$get$jm",function(){return P.au('\\b([\\w|\\.]+)\\b[\\s\\n\\r]*=[\\s\\n\\r]*([{"])',!0,!1)},"jn","$get$jn",function(){return P.au("(.)[\\s\\n\\r]*{[\\s\\n\\r]*([\\d]+|0[xX][0-9a-fA-F]+)[\\s\\n\\r]*,",!0,!1)},"jo","$get$jo",function(){return P.au("(--|#).*[\\n\\r]",!0,!1)},"f6","$get$f6",function(){return P.au(",[\\s\\n\\r]*}",!0,!1)},"jp","$get$jp",function(){return P.au('(["}])\\s*[\\n\\r]',!0,!1)},"jq","$get$jq",function(){return P.au('{([\\s\\n\\r]*([-\\d\\.]+|"[\\w\\d\\s-^"]+"|[\\w_]+)[\\s\\n\\r]*,*)+[\\s\\n\\r]*}',!0,!1)},"jr","$get$jr",function(){return P.au("(})[\\s\\n\\r]*([^,}])",!0,!1)},"js","$get$js",function(){return P.au("(\\\\)",!0,!1)},"jh","$get$jh",function(){return P.au('(=[\\s\\n\\r]*"[^"]*")([\\s\\n\\r]*[^,])',!0,!1)},"ji","$get$ji",function(){return P.au('=\\s*_\\("(.*)"\\)',!0,!1)},"jj","$get$jj",function(){return P.au("{([\\d]+|0[xX][0-9a-fA-F]+)(,\\s*{\\s*([-\\d\\.]+)\\s*,\\s*([-\\d\\.]+)\\s*})?,*\\s*(([-\\d\\.]+[^}]*,*)*|(\\w*=(.|{.*}),*)*)}",!0,!1)},"jk","$get$jk",function(){return P.au("([^:\\s\\n\\r][\\s\\n\\r]*)(?={)",!0,!1)},"jl","$get$jl",function(){return P.au('"[\\w\\d\\s-^"]+"|[-\\d\\.]+|[\\w_]+',!0,!1)},"f7","$get$f7",function(){return P.ae(["blockscale","scale","blockshape","shape"])},"jt","$get$jt",function(){return P.au("\\d+_",!0,!1)},"eR","$get$eR",function(){return P.ae(["NORMAL",C.b,"LAUNCHER",C.i,"THRUSTER_IN",C.l,"THRUSTER_OUT",C.m,"WEAPON_IN",C.n,"WEAPON_OUT",C.k,"MISSILE",C.j,"ROOT",C.o])},"fj","$get$fj",function(){return H.j4(P.t,S.b4)},"aF","$get$aF",function(){var z=S.w("MISSING",20,!1)
z.w(new S.vr())
z.u()
return z},"c5","$get$c5",function(){var z=S.w("SQUARE",10,!1)
z.w(new S.vt())
z.u()
return z},"kc","$get$kc",function(){var z=S.w("OCTAGON",10,!1)
z.w(new S.wt())
z.u()
return z},"kG","$get$kG",function(){var z=S.w("THRUSTER",10,!1)
z.w(new S.ws())
z.u()
return z},"jI","$get$jI",function(){var z=S.w("CANNON",10,!1)
z.w(new S.wr())
z.u()
return z},"k8","$get$k8",function(){var z=S.w("MISSILE",10,!1)
z.w(new S.wq())
z.u()
return z},"kf","$get$kf",function(){var z=S.w("RECT",5,!1)
z.w(new S.wp())
z.u()
return z},"jY","$get$jY",function(){var z=S.w("HEXAGON",10,!1)
z.w(new S.wo())
z.u()
return z},"kJ","$get$kJ",function(){var z=S.w("TRI",10,!1)
z.w(new S.wn())
z.u()
return z},"jK","$get$jK",function(){var z=S.w("COMMAND",10,!1)
z.w(new S.wm())
z.u()
return z},"jL","$get$jL",function(){var z=S.w("COMMAND_MISSILE",10,!1)
z.w(new S.wk())
z.u()
return z},"kB","$get$kB",function(){var z=S.w("SENSOR",10,!1)
z.w(new S.wj())
z.u()
return z},"jH","$get$jH",function(){var z=S.w("ADAPTER",10,!1)
z.w(new S.wi())
z.u()
return z},"ke","$get$ke",function(){var z=S.w("PENTAGON",10,!1)
z.w(new S.wh())
z.u()
return z},"kp","$get$kp",function(){var z=S.w("RHOMBUS_72_108",10,!1)
z.w(new S.wg())
z.u()
return z},"ko","$get$ko",function(){var z=S.w("RHOMBUS_36_144",10,!1)
z.w(new S.wf())
z.u()
return z},"kH","$get$kH",function(){var z=S.w("THRUSTER_PENT",10,!1)
z.w(new S.we())
z.u()
return z},"jO","$get$jO",function(){var z=S.w("DISH_WEAPON",4,!1)
z.w(new S.wd())
z.u()
return z},"jN","$get$jN",function(){var z=S.w("DISH_THRUSTER",4,!1)
z.w(new S.wc())
z.u()
return z},"kq","$get$kq",function(){var z=S.w("RIGHT_TRI",10,!1)
z.w(new S.wb())
z.b6(0,-2.356194490192345)
z.fs(0,3.9269908169872414,[0])
z.u()
return z},"ki","$get$ki",function(){var z=S.w("RECT_LAUNCHER",3,!1)
z.w(new S.w9())
z.u()
return z},"kg","$get$kg",function(){var z=S.w("RECT_CANNON",1,!1)
z.w(new S.w8())
z.u()
return z},"kh","$get$kh",function(){var z=S.w("RECT_CANNON_BOOST",1,!1)
z.w(new S.w7())
z.u()
return z},"kk","$get$kk",function(){var z=S.w("RECT_LONG",10,!1)
z.w(new S.w6())
z.u()
return z},"k6","$get$k6",function(){var z=S.w("ISOTRI_72",10,!1)
z.w(new S.w5())
z.u()
return z},"k4","$get$k4",function(){var z=S.w("ISOTRI_36",10,!1)
z.w(new S.w4())
z.u()
return z},"kr","$get$kr",function(){var z=S.w("RIGHT_TRI2L",10,!1)
z.w(new S.w3())
z.b6(0,-0.7853981633974483)
z.u()
return z},"ks","$get$ks",function(){var z=S.w("RIGHT_TRI2R",10,!1)
z.w(new S.w2())
z.b6(0,-2.356194490192345)
z.u()
return z},"kx","$get$kx",function(){var z=S.w("SEED_1",3,!1)
z.w(new S.vZ())
z.u()
return z},"ky","$get$ky",function(){var z=S.w("SEED_2",3,!1)
z.w(new S.vY())
z.u()
return z},"kz","$get$kz",function(){var z=S.w("SEED_3",3,!1)
z.w(new S.vX())
z.u()
return z},"kA","$get$kA",function(){var z=S.w("SEED_4",3,!1)
z.w(new S.vW())
z.u()
return z},"kl","$get$kl",function(){var z=S.w("RECT_LONG_NARROW",10,!1)
z.w(new S.w1())
z.u()
return z},"kj","$get$kj",function(){var z=S.w("RECT_LAUNCHER1",3,!1)
z.w(new S.w0())
z.u()
return z},"kt","$get$kt",function(){var z=S.w("RIGHT_TRI_22_5L",10,!1)
z.w(new S.vV())
z.b6(0,-0.7853981633974483)
z.u()
return z},"ku","$get$ku",function(){var z=S.w("RIGHT_TRI_22_5R",10,!1)
z.w(new S.vU())
z.b6(0,-2.356194490192345)
z.u()
return z},"jM","$get$jM",function(){var z=S.w("DISH_MISSILE",4,!1)
z.w(new S.vT())
z.u()
return z},"kn","$get$kn",function(){var z=S.w("RECT_ROOT",3,!1)
z.w(new S.vS())
z.u()
return z},"jP","$get$jP",function(){var z=S.w("GEM_1",3,!1)
z.w(new S.vR())
z.u()
return z},"jQ","$get$jQ",function(){var z=S.w("GEM_2",3,!1)
z.w(new S.vQ())
z.u()
return z},"jS","$get$jS",function(){var z=S.w("GEM_3",3,!1)
z.w(new S.vO())
z.u()
return z},"jU","$get$jU",function(){var z=S.w("GEM_4",3,!1)
z.w(new S.vN())
z.u()
return z},"k0","$get$k0",function(){var z=S.w("ISOTRI_25",10,!1)
z.w(new S.vM())
z.u()
return z},"k1","$get$k1",function(){var z=S.w("ISOTRI_25_MISSILE",10,!1)
z.w(new S.vL())
z.u()
return z},"jZ","$get$jZ",function(){var z=S.w("ISOTRI_13",10,!1)
z.w(new S.vK())
z.u()
return z},"k_","$get$k_",function(){var z=S.w("ISOTRI_13_MISSILE",10,!1)
z.w(new S.vJ())
z.u()
return z},"k5","$get$k5",function(){var z=S.w("ISOTRI_6",10,!1)
z.w(new S.vI())
z.u()
return z},"jX","$get$jX",function(){var z=S.w("HEPTAGON_LAUNCHER",10,!0)
z.w(new S.vH())
z.u()
return z},"jW","$get$jW",function(){var z=S.w("HEPTAGON",10,!1)
z.w(new S.vG())
z.u()
return z},"jR","$get$jR",function(){var z=S.w("GEM_2_LAUNCHER",3,!0)
z.w(new S.vF())
z.u()
return z},"jT","$get$jT",function(){var z=S.w("GEM_3_LAUNCHER",3,!0)
z.w(new S.vD())
z.u()
return z},"jV","$get$jV",function(){var z=S.w("GEM_4_LAUNCHER",3,!0)
z.w(new S.vC())
z.u()
return z},"km","$get$km",function(){var z=S.w("RECT_QUARTER",10,!1)
z.w(new S.vB())
z.u()
return z},"k3","$get$k3",function(){var z=S.w("ISOTRI_3",10,!1)
z.w(new S.vA())
z.u()
return z},"k2","$get$k2",function(){var z=S.w("ISOTRI_25_WEAPON",10,!1)
z.w(new S.vz())
z.u()
return z},"kb","$get$kb",function(){var z=S.w("NONAGON",10,!1)
z.w(new S.vy())
z.u()
return z},"k7","$get$k7",function(){var z=S.w("ISOTRI_80",10,!1)
z.w(new S.vx())
z.u()
return z},"kI","$get$kI",function(){var z=S.w("THRUSTER_RECT",10,!1)
z.w(new S.vw())
z.u()
return z},"kD","$get$kD",function(){var z=S.w("SQUARE_HALF",1,!1)
z.w(new S.vv())
z.u()
return z},"kE","$get$kE",function(){var z=S.w("SQUARE_LAUNCHER",10,!0)
z.w(new S.vu())
z.u()
return z},"kF","$get$kF",function(){var z=S.w("SQUARE_MISSILE",10,!1)
z.w(new S.ww())
z.u()
return z},"kv","$get$kv",function(){var z=S.w("RIGHT_TRI_30L",10,!1)
z.w(new S.wv())
z.b6(0,-0.7853981633974483)
z.u()
return z},"kw","$get$kw",function(){var z=S.w("RIGHT_TRI_30R",10,!1)
z.w(new S.wu())
z.b6(0,-2.356194490192345)
z.u()
return z},"kd","$get$kd",function(){var z=S.w("OCTAGON_1",10,!1)
z.w(new S.wl())
z.u()
return z},"kC","$get$kC",function(){var z=S.w("SQUARE_1",10,!1)
z.w(new S.wa())
z.u()
return z},"jJ","$get$jJ",function(){var z=S.w("CANNON2",10,!1)
z.w(new S.w_())
z.u()
return z},"k9","$get$k9",function(){var z=S.w("MISSILE_LAUNCHER",10,!1)
z.w(new S.vP())
z.u()
return z},"ka","$get$ka",function(){var z=S.w("MISSILE_SHORT",10,!1)
z.w(new S.vE())
z.u()
return z},"dX","$get$dX",function(){return[$.$get$c5(),$.$get$kc(),$.$get$kG(),$.$get$jI(),$.$get$k8(),$.$get$kf(),$.$get$jY(),$.$get$kJ(),$.$get$jK(),$.$get$jL(),$.$get$kB(),$.$get$jH(),$.$get$ke(),$.$get$kp(),$.$get$ko(),$.$get$kH(),$.$get$jO(),$.$get$jN(),$.$get$kq(),$.$get$ki(),$.$get$kg(),$.$get$kh(),$.$get$kk(),$.$get$k6(),$.$get$k4(),$.$get$kr(),$.$get$ks(),$.$get$kl(),$.$get$kj(),$.$get$kx(),$.$get$ky(),$.$get$kz(),$.$get$kA(),$.$get$kt(),$.$get$ku(),$.$get$jM(),$.$get$kn(),$.$get$jP(),$.$get$jQ(),$.$get$jS(),$.$get$jU(),$.$get$k0(),$.$get$k1(),$.$get$jZ(),$.$get$k_(),$.$get$k5(),$.$get$jX(),$.$get$jW(),$.$get$jR(),$.$get$jT(),$.$get$jV(),$.$get$km(),$.$get$k3(),$.$get$k2(),$.$get$kb(),$.$get$k7(),$.$get$kI(),$.$get$kD(),$.$get$kE(),$.$get$kF(),$.$get$kv(),$.$get$kw(),$.$get$kd(),$.$get$kC(),$.$get$jJ(),$.$get$k9(),$.$get$ka()]},"ba","$get$ba",function(){return[]},"d9","$get$d9",function(){return P.as()},"lT","$get$lT",function(){return P.au("\r\n|\r|\n",!0,!1)},"dw","$get$dw",function(){return H.lN("_$dart_dartClosure")},"iV","$get$iV",function(){return H.pf()},"iW","$get$iW",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.iF
$.iF=z+1
z="expando$key$"+z}return H.l(new P.nG(null,z),[P.E])},"kX","$get$kX",function(){return H.bo(H.dZ({
toString:function(){return"$receiver$"}}))},"kY","$get$kY",function(){return H.bo(H.dZ({$method$:null,
toString:function(){return"$receiver$"}}))},"kZ","$get$kZ",function(){return H.bo(H.dZ(null))},"l_","$get$l_",function(){return H.bo(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"l3","$get$l3",function(){return H.bo(H.dZ(void 0))},"l4","$get$l4",function(){return H.bo(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"l1","$get$l1",function(){return H.bo(H.l2(null))},"l0","$get$l0",function(){return H.bo(function(){try{null.$method$}catch(z){return z.message}}())},"l6","$get$l6",function(){return H.bo(H.l2(void 0))},"l5","$get$l5",function(){return H.bo(function(){try{(void 0).$method$}catch(z){return z.message}}())},"fr","$get$fr",function(){return P.tM()},"cA","$get$cA",function(){return[]},"l8","$get$l8",function(){return P.au("^[\\-\\.0-9A-Z_a-z~]*$",!0,!1)},"ll","$get$ll",function(){return P.j5(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"fz","$get$fz",function(){return P.as()},"fL","$get$fL",function(){return P.fI(self)},"fs","$get$fs",function(){return H.lN("_$dart_dartObject")},"fD","$get$fD",function(){return function DartObject(a){this.o=a}},"hu","$get$hu",function(){return P.au("^\\S+$",!0,!1)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=["e","value","f",null,"key","error","element","x","_","stackTrace","each","o","result","y","invocation","data","attributeName","context","closure","tinycolor","object","sender","event","isolate","n","numberOfArguments","arg","arg1","arg2","attr","callback","captureThis","self","arguments","arg3","arg4","fe"]
init.types=[{func:1,args:[W.f1]},{func:1,args:[,,]},{func:1,args:[,]},{func:1},{func:1,args:[S.X]},{func:1,args:[W.aA]},{func:1,v:true},{func:1,args:[P.d3]},{func:1,args:[P.t]},{func:1,args:[S.b4,P.E]},{func:1,args:[P.t,,]},{func:1,args:[S.v]},{func:1,args:[W.aW,P.B]},{func:1,ret:W.J},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[S.ap,S.ap]},{func:1,args:[S.f8]},{func:1,ret:P.aC,args:[P.aR,P.aR]},{func:1,ret:P.t,args:[P.E]},{func:1,ret:P.bc,args:[W.W,P.t,P.t,W.fy]},{func:1,args:[S.b4,S.b4]},{func:1,args:[S.aX,S.aX]},{func:1,args:[,P.t]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.k],opt:[P.bv]},{func:1,v:true,args:[,],opt:[P.bv]},{func:1,args:[,],opt:[,]},{func:1,args:[P.bc]},{func:1,args:[,P.bv]},{func:1,v:true,args:[,P.bv]},{func:1,ret:P.k,args:[,]},{func:1,ret:P.b7},{func:1,ret:P.k,opt:[P.k]},{func:1,args:[S.aj]},{func:1,ret:[P.i,W.ff]},{func:1,v:true,args:[W.J,W.J]},{func:1,v:true,opt:[P.k]},{func:1,ret:P.t,args:[S.v]},{func:1,ret:P.t,args:[P.t]},{func:1,args:[W.fc]},{func:1,ret:P.E,args:[P.az,P.az]},{func:1,ret:P.E,args:[P.t]},{func:1,ret:P.aC,args:[P.t]},{func:1,args:[P.cu,,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.xI(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.bz=a.bz
Isolate.aI=a.aI
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.m_(S.jz(),b)},[])
else (function(b){H.m_(S.jz(),b)})([])})})()