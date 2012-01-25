/*
 *  /MathJax/jax/output/SVG/autoload/multiline.js
 *  
 *  Copyright (c) 2010 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var d="2.0";var a=MathJax.ElementJax.mml,f=MathJax.OutputJax.SVG,b=f.BBOX;var e={newline:0,nobreak:1000000,goodbreak:[-200],badbreak:[+200],auto:[0],toobig:500,nestfactor:400,fence:500};var c={linebreakstyle:"after"};a.mrow.Augment({SVGmultiline:function(k){var o=this;while(o.inferred||(o.parent&&o.parent.type==="mrow"&&o.parent.data.length===1)){o=o.parent}var n=((o.type==="math"&&o.Get("display")==="block")||o.type==="mtd");o.isMultiline=true;var p=this.getValues("linebreak","linebreakstyle","lineleading","linebreakmultchar","indentalign","indentshift","indentalignfirst","indentshiftfirst","indentalignlast","indentshiftlast");if(p.linebreakstyle===a.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE){p.linebreakstyle=this.Get("infixlinebreakstyle")}p.lineleading=f.length2em(p.lineleading,1,0.5);k=this.SVG();k.w=f.linebreakWidth;var g={n:0,Y:0,scale:this.SVGgetScale(),isTop:n,values:{},VALUES:p},m=this.SVGgetAlign(g,{}),i=this.SVGgetShift(g,{},m),h=[],j={index:[],penalty:e.nobreak,w:0,W:i,shift:i,scanW:i,nest:0},l=false;while(this.SVGbetterBreak(j,g)&&(j.scanW>=f.linebreakWidth||j.penalty==e.newline)){this.SVGaddLine(k,h,j.index,g,j.values,l);h=j.index.slice(0);l=true;m=this.SVGgetAlign(g,j.values);i=this.SVGgetShift(g,j.values,m);if(m===a.INDENTALIGN.CENTER){i=0}j.W=j.shift=j.scanW=i;j.penalty=e.nobreak}g.isLast=true;this.SVGaddLine(k,h,[],g,c,l);this.SVGhandleSpace(k);this.SVGhandleColor(k);k.isMultiline=true;this.SVGsaveData(k);return k}});a.mbase.Augment({SVGlinebreakPenalty:e,SVGbetterBreak:function(j,g){if(this.isToken){return false}if(this.isEmbellished()){j.embellished=this;return this.CoreMO().SVGbetterBreak(j,g)}if(this.linebreakContainer){return false}var r=j.index.slice(0),o=j.index.shift(),n=this.data.length,l,k=j.W,q=(j.index.length>0),h=false;if(o==null){o=-1}if(!q){o++;j.W+=j.w}j.w=0;j.nest++;while(o<n&&j.W<1.33*f.linebreakWidth){if(this.data[o]){if(this.data[o].SVGbetterBreak(j,g)){h=true;r=[o].concat(j.index);l=j.W;if(j.penalty===e.newline){j.index=r;j.nest--;return true}}if(!q){var p=this.data[o].SVGdata;k+=p.w+p.x;if(p.X){k+=p.X}j.W=j.scanW=k}}j.index=[];o++;q=false}j.nest--;j.index=r;if(h){j.W=l}return h},SVGaddLine:function(l,h,k,g,p,n){line=b();g.first=n;g.last=true;this.SVGmoveLine(h,k,line,g,p);line.Clean();var o=this.SVGgetAlign(g,p),i=this.SVGgetShift(g,p,o);if(i){if(o===a.INDENTALIGN.LEFT){line.x=i}else{if(o===MMLINDENTALIGN.RIGHT){line.w+=i;line.r=line.w}}}if(g.n>0){var m=f.FONTDATA.baselineskip*g.scale;var j=(g.values.lineleading==null?g.VALUES:g.values).lineleading;g.Y-=Math.max(m,g.d+line.h+j)}l.Align(line,o,0,g.Y);g.d=line.d;g.values=p;g.n++},SVGgetAlign:function(j,g){var k=g,h=j.values,i=j.VALUES,l;if(j.n===0){l=k.indentalignfirst||h.indentalignfirst||i.indentalignfirst}else{if(j.isLast){l=h.indentalignlast||i.indentalignlast}else{l=h.indentalign||i.indentalign}}if(l===a.INDENTALIGN.INDENTALIGN){l=h.indentalign||i.indentalign}if(l===a.INDENTALIGN.AUTO){l=(j.isTop?this.displayAlign:a.INDENTALIGN.LEFT)}return l},SVGgetShift:function(k,h,m){if(m===a.INDENTALIGN.CENTER){return 0}var l=h,i=k.values,j=k.VALUES,g;if(k.n===0){g=l.indentshiftfirst||i.indentshiftfirst||j.indentshiftfirst}else{if(k.isLast){g=i.indentshiftlast||j.indentshiftlast}else{g=i.indentshift||j.indentshift}}if(g===a.INDENTSHIFT.INDENTSHIFT){g=i.indentshift||j.indentshift}if(g==="auto"||g===""){g=(k.isTSop?this.displayIndent:"0")}return f.length2em(g,0)},SVGmoveLine:function(p,g,k,o,h){var m=p[0],l=g[0];if(m==null){m=-1}if(l==null){l=this.data.length-1}if(m===l&&p.length>1){this.data[m].SVGmoveSlice(p.slice(1),g.slice(1),k,o,h,"paddingLeft")}else{var n=o.last;o.last=false;while(m<l){if(this.data[m]){if(p.length<=1){this.data[m].SVGmove(k,o,h)}else{this.data[m].SVGmoveSlice(p.slice(1),[],k,o,h,"paddingLeft")}}m++;o.first=false;p=[]}o.last=n;if(this.data[m]){if(g.length<=1){this.data[m].SVGmove(k,o,h)}else{this.data[m].SVGmoveSlice([],g.slice(1),k,o,h,"paddingRight")}}}},SVGmoveSlice:function(m,g,i,j,h,k){var l=b();this.SVGmoveLine(m,g,l,j,h);l.Clean();this.SVGhandleColor(l);i.Add(l,i.w,0,true);return l},SVGmove:function(g,j,i){if(!(j.first||j.last)||(j.first&&j.values.linebreakstyle===a.LINEBREAKSTYLE.BEFORE)||(j.last&&i.linebreakstyle===a.LINEBREAKSTYLE.AFTER)){var h=this.toSVG(this.SVGdata.HW,this.SVGdata.D);if(j.last){h.x=0}if(j.first||j.nextIsFirst){delete j.nextIsFirst;if(h.X){h.X=0}}g.Add(h,g.w,0,true)}else{if(j.first){j.nextIsFirst=true}else{delete j.nextIsFirst}}}});a.mo.Augment({SVGbetterBreak:function(i,g){var q=this.getValues("linebreak","linebreakstyle","lineleading","linebreakmultchar","indentalign","indentshift","indentalignfirst","indentshiftfirst","indentalignlast","indentshiftlast");if(q.linebreakstyle===a.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE){q.linebreakstyle=this.Get("infixlinebreakstyle")}var j=i.W,k=(i.embellished||this);delete i.embellished;var m=k.SVGdata,p=m.w+m.x;if(q.linebreakstyle===a.LINEBREAKSTYLE.AFTER){j+=p;p=0}if(j-i.shift===0){return false}var l=f.linebreakWidth-j;if(g.n===0&&(q.indentshiftfirst!==g.VALUES.indentshiftfirst||q.indentalignfirst!==g.VALUES.indentalignfirst)){var n=this.SVGgetAlign(g,q),h=this.SVGgetShift(g,q,n);l+=(i.shift-h)}var o=Math.floor(l/f.linebreakWidth*1000);if(o<0){o=e.toobig-3*o}if(this.Get("fence")){o+=e.fence}o+=i.nest*e.nestfactor;var r=e[q.linebreak||a.LINEBREAK.AUTO];if(!(r instanceof Array)){if(l>=0){o=r*i.nest}}else{o=Math.max(1,o+r[0]*i.nest)}if(o>=i.penalty){return false}i.penalty=o;i.values=q;i.W=j;i.w=p;q.lineleading=f.length2em(q.lineleading,g.VALUES.lineleading);return true}});a.mspace.Augment({SVGbetterBreak:function(h,g){var n=this.getValues("linebreak");var i=h.W,k=this.SVGdata,m=k.w+k.x;if(n.linebreakstyle===a.LINEBREAKSTYLE.AFTER){i+=m;m=0}if(i-h.shift===0){return false}var j=f.linebreakWidth-i;var l=Math.floor(j/f.linebreakWidth*1000);if(l<0){l=e.toobig-3*l}l+=h.nest*e.nestfactor;var o=e[n.linebreak||a.LINEBREAK.AUTO];if(!(o instanceof Array)){if(j>=0){l=o*h.nest}}else{l=Math.max(1,l+o[0]*h.nest)}if(l>=h.penalty){return false}h.penalty=l;h.values=n;h.W=i;h.w=m;n.lineleading=g.VALUES.lineleading;n.linebreakstyle="before";return true}});MathJax.Hub.Register.StartupHook("TeX mathchoice Ready",function(){a.TeXmathchoice.Augment({SVGbetterBreak:function(h,g){return this.Core().SVGbetterBreak(h,g)},SVGmoveLine:function(k,g,i,j,h){return this.Core().SVGmoveSlice(k,g,i,j,h)}})});a.maction.Augment({SVGbetterBreak:function(h,g){return this.Core().SVGbetterBreak(h,g)},SVGmoveLine:function(k,g,i,j,h){return this.Core().SVGmoveSlice(k,g,i,j,h)},});a.semantics.Augment({SVGbetterBreak:function(h,g){return(this.data[0]?this.data[0].SVGbetterBreak(h,g):false)},SVGmoveLine:function(k,g,i,j,h){return(this.data[0]?this.data[0].SVGmoveSlice(k,g,i,j,h):null)}});MathJax.Hub.Startup.signal.Post("SVG multiline Ready");MathJax.Ajax.loadComplete(f.autoloadDir+"/multiline.js")});

