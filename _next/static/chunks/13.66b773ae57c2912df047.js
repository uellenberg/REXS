(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"+dQi":function(e,t,r){!function(e){"use strict";e.defineMode("javascript",(function(t,r){var n,o,i=t.indentUnit,a=r.statementIndent,s=r.jsonld,c=r.json||s,u=!1!==r.trackScope,d=r.typescript,p=r.wordCharacters||/[\w$\xa1-\uffff]/,l=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),o=e("keyword d"),i=e("operator"),a={type:"atom",style:"atom"};return{if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:o,break:o,continue:o,new:e("new"),delete:n,void:n,throw:n,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:i,typeof:i,instanceof:i,true:a,false:a,null:a,undefined:a,NaN:a,Infinity:a,this:e("this"),class:e("class"),super:e("atom"),yield:n,export:e("export"),import:e("import"),extends:n,await:n}}(),f=/[+\-*&%=<>!?|~^@]/,h=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function m(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function y(e,t,r){return n=e,o=r,t}function g(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=v(r),t.tokenize(e,t);if("."==r&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return y("number","number");if("."==r&&e.match(".."))return y("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return y(r);if("="==r&&e.eat(">"))return y("=>","operator");if("0"==r&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return y("number","number");if(/\d/.test(r))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),y("number","number");if("/"==r)return e.eat("*")?(t.tokenize=k,k(e,t)):e.eat("/")?(e.skipToEnd(),y("comment","comment")):ot(e,t,1)?(m(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),y("regexp","string-2")):(e.eat("="),y("operator","operator",e.current()));if("`"==r)return t.tokenize=b,b(e,t);if("#"==r&&"!"==e.peek())return e.skipToEnd(),y("meta","meta");if("#"==r&&e.eatWhile(p))return y("variable","property");if("<"==r&&e.match("!--")||"-"==r&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start)))return e.skipToEnd(),y("comment","comment");if(f.test(r))return">"==r&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=r&&"="!=r||e.eat("="):/[<>*+\-|&?]/.test(r)&&(e.eat(r),">"==r&&e.eat(r))),"?"==r&&e.eat(".")?y("."):y("operator","operator",e.current());if(p.test(r)){e.eatWhile(p);var n=e.current();if("."!=t.lastType){if(l.propertyIsEnumerable(n)){var o=l[n];return y(o.type,o.style,n)}if("async"==n&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return y("async","keyword",n)}return y("variable","variable",n)}}function v(e){return function(t,r){var n,o=!1;if(s&&"@"==t.peek()&&t.match(h))return r.tokenize=g,y("jsonld-keyword","meta");for(;null!=(n=t.next())&&(n!=e||o);)o=!o&&"\\"==n;return o||(r.tokenize=g),y("string","string")}}function k(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=g;break}n="*"==r}return y("comment","comment")}function b(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=g;break}n=!n&&"\\"==r}return y("quasi","string-2",e.current())}var w="([{}])";function x(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(d){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var o=0,i=!1,a=r-1;a>=0;--a){var s=e.string.charAt(a),c=w.indexOf(s);if(c>=0&&c<3){if(!o){++a;break}if(0==--o){"("==s&&(i=!0);break}}else if(c>=3&&c<6)++o;else if(p.test(s))i=!0;else if(/["'\/`]/.test(s))for(;;--a){if(0==a)return;if(e.string.charAt(a-1)==s&&"\\"!=e.string.charAt(a-2)){a--;break}}else if(i&&!o){++a;break}}i&&!o&&(t.fatArrowAt=a)}}var C={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function j(e,t,r,n,o,i){this.indented=e,this.column=t,this.type=r,this.prev=o,this.info=i,null!=n&&(this.align=n)}function D(e,t){if(!u)return!1;for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}function O(e,t,r,n,o){var i=e.cc;for(M.state=e,M.stream=o,M.marked=null,M.cc=i,M.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((i.length?i.pop():c?B:L)(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return M.marked?M.marked:"variable"==r&&D(e,n)?"variable-2":t}}var M={state:null,column:null,marked:null,cc:null};function E(){for(var e=arguments.length-1;e>=0;e--)M.cc.push(arguments[e])}function S(){return E.apply(null,arguments),!0}function V(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function U(e){var t=M.state;if(M.marked="def",u){if(t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var n=A(e,t.context);if(null!=n)return void(t.context=n)}else if(!V(e,t.localVars))return void(t.localVars=new I(e,t.localVars));r.globalVars&&!V(e,t.globalVars)&&(t.globalVars=new I(e,t.globalVars))}}function A(e,t){if(t){if(t.block){var r=A(e,t.prev);return r?r==t.prev?t:new _(r,t.vars,!0):null}return V(e,t.vars)?t:new _(t.prev,new I(e,t.vars),!1)}return null}function P(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function _(e,t,r){this.prev=e,this.vars=t,this.block=r}function I(e,t){this.name=e,this.next=t}var N=new I("this",new I("arguments",null));function T(){M.state.context=new _(M.state.context,M.state.localVars,!1),M.state.localVars=N}function z(){M.state.context=new _(M.state.context,M.state.localVars,!0),M.state.localVars=null}function R(){M.state.localVars=M.state.context.vars,M.state.context=M.state.context.prev}function q(e,t){var r=function(){var r=M.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var o=r.lexical;o&&")"==o.type&&o.align;o=o.prev)n=o.indented;r.lexical=new j(n,M.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function H(){var e=M.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function W(e){function t(r){return r==e?S():";"==e||"}"==r||")"==r||"]"==r?E():S(t)}return t}function L(e,t){return"var"==e?S(q("vardef",t),Ee,W(";"),H):"keyword a"==e?S(q("form"),F,L,H):"keyword b"==e?S(q("form"),L,H):"keyword d"==e?M.stream.match(/^\s*$/,!1)?S():S(q("stat"),J,W(";"),H):"debugger"==e?S(W(";")):"{"==e?S(q("}"),z,le,H,R):";"==e?S():"if"==e?("else"==M.state.lexical.info&&M.state.cc[M.state.cc.length-1]==H&&M.state.cc.pop()(),S(q("form"),F,L,H,_e)):"function"==e?S(ze):"for"==e?S(q("form"),z,Ie,L,R,H):"class"==e||d&&"interface"==t?(M.marked="keyword",S(q("form","class"==e?e:t),Le,H)):"variable"==e?d&&"declare"==t?(M.marked="keyword",S(L)):d&&("module"==t||"enum"==t||"type"==t)&&M.stream.match(/^\s*\w/,!1)?(M.marked="keyword","enum"==t?S(tt):"type"==t?S(qe,W("operator"),ge,W(";")):S(q("form"),Se,W("{"),q("}"),le,H,H)):d&&"namespace"==t?(M.marked="keyword",S(q("form"),B,L,H)):d&&"abstract"==t?(M.marked="keyword",S(L)):S(q("stat"),ie):"switch"==e?S(q("form"),F,W("{"),q("}","switch"),z,le,H,H,R):"case"==e?S(B,W(":")):"default"==e?S(W(":")):"catch"==e?S(q("form"),T,$,L,H,R):"export"==e?S(q("stat"),Fe,H):"import"==e?S(q("stat"),Je,H):"async"==e?S(L):"@"==t?S(B,L):E(q("stat"),B,W(";"),H)}function $(e){if("("==e)return S(He,W(")"))}function B(e,t){return G(e,t,!1)}function K(e,t){return G(e,t,!0)}function F(e){return"("!=e?E():S(q(")"),J,W(")"),H)}function G(e,t,r){if(M.state.fatArrowAt==M.stream.start){var n=r?te:ee;if("("==e)return S(T,q(")"),de(He,")"),H,W("=>"),n,R);if("variable"==e)return E(T,Se,W("=>"),n,R)}var o=r?X:Q;return C.hasOwnProperty(e)?S(o):"function"==e?S(ze,o):"class"==e||d&&"interface"==t?(M.marked="keyword",S(q("form"),We,H)):"keyword c"==e||"async"==e?S(r?K:B):"("==e?S(q(")"),J,W(")"),H,o):"operator"==e||"spread"==e?S(r?K:B):"["==e?S(q("]"),et,H,o):"{"==e?pe(se,"}",null,o):"quasi"==e?E(Y,o):"new"==e?S(re(r)):S()}function J(e){return e.match(/[;\}\)\],]/)?E():E(B)}function Q(e,t){return","==e?S(J):X(e,t,!1)}function X(e,t,r){var n=0==r?Q:X,o=0==r?B:K;return"=>"==e?S(T,r?te:ee,R):"operator"==e?/\+\+|--/.test(t)||d&&"!"==t?S(n):d&&"<"==t&&M.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1)?S(q(">"),de(ge,">"),H,n):"?"==t?S(B,W(":"),o):S(o):"quasi"==e?E(Y,n):";"!=e?"("==e?pe(K,")","call",n):"."==e?S(ae,n):"["==e?S(q("]"),J,W("]"),H,n):d&&"as"==t?(M.marked="keyword",S(ge,n)):"regexp"==e?(M.state.lastType=M.marked="operator",M.stream.backUp(M.stream.pos-M.stream.start-1),S(o)):void 0:void 0}function Y(e,t){return"quasi"!=e?E():"${"!=t.slice(t.length-2)?S(Y):S(B,Z)}function Z(e){if("}"==e)return M.marked="string-2",M.state.tokenize=b,S(Y)}function ee(e){return x(M.stream,M.state),E("{"==e?L:B)}function te(e){return x(M.stream,M.state),E("{"==e?L:K)}function re(e){return function(t){return"."==t?S(e?oe:ne):"variable"==t&&d?S(De,e?X:Q):E(e?K:B)}}function ne(e,t){if("target"==t)return M.marked="keyword",S(Q)}function oe(e,t){if("target"==t)return M.marked="keyword",S(X)}function ie(e){return":"==e?S(H,L):E(Q,W(";"),H)}function ae(e){if("variable"==e)return M.marked="property",S()}function se(e,t){return"async"==e?(M.marked="property",S(se)):"variable"==e||"keyword"==M.style?(M.marked="property","get"==t||"set"==t?S(ce):(d&&M.state.fatArrowAt==M.stream.start&&(r=M.stream.match(/^\s*:\s*/,!1))&&(M.state.fatArrowAt=M.stream.pos+r[0].length),S(ue))):"number"==e||"string"==e?(M.marked=s?"property":M.style+" property",S(ue)):"jsonld-keyword"==e?S(ue):d&&P(t)?(M.marked="keyword",S(se)):"["==e?S(B,fe,W("]"),ue):"spread"==e?S(K,ue):"*"==t?(M.marked="keyword",S(se)):":"==e?E(ue):void 0;var r}function ce(e){return"variable"!=e?E(ue):(M.marked="property",S(ze))}function ue(e){return":"==e?S(K):"("==e?E(ze):void 0}function de(e,t,r){function n(o,i){if(r?r.indexOf(o)>-1:","==o){var a=M.state.lexical;return"call"==a.info&&(a.pos=(a.pos||0)+1),S((function(r,n){return r==t||n==t?E():E(e)}),n)}return o==t||i==t?S():r&&r.indexOf(";")>-1?E(e):S(W(t))}return function(r,o){return r==t||o==t?S():E(e,n)}}function pe(e,t,r){for(var n=3;n<arguments.length;n++)M.cc.push(arguments[n]);return S(q(t,r),de(e,t),H)}function le(e){return"}"==e?S():E(L,le)}function fe(e,t){if(d){if(":"==e)return S(ge);if("?"==t)return S(fe)}}function he(e,t){if(d&&(":"==e||"in"==t))return S(ge)}function me(e){if(d&&":"==e)return M.stream.match(/^\s*\w+\s+is\b/,!1)?S(B,ye,ge):S(ge)}function ye(e,t){if("is"==t)return M.marked="keyword",S()}function ge(e,t){return"keyof"==t||"typeof"==t||"infer"==t||"readonly"==t?(M.marked="keyword",S("typeof"==t?K:ge)):"variable"==e||"void"==t?(M.marked="type",S(je)):"|"==t||"&"==t?S(ge):"string"==e||"number"==e||"atom"==e?S(je):"["==e?S(q("]"),de(ge,"]",","),H,je):"{"==e?S(q("}"),ke,H,je):"("==e?S(de(Ce,")"),ve,je):"<"==e?S(de(ge,">"),ge):"quasi"==e?E(we,je):void 0}function ve(e){if("=>"==e)return S(ge)}function ke(e){return e.match(/[\}\)\]]/)?S():","==e||";"==e?S(ke):E(be,ke)}function be(e,t){return"variable"==e||"keyword"==M.style?(M.marked="property",S(be)):"?"==t||"number"==e||"string"==e?S(be):":"==e?S(ge):"["==e?S(W("variable"),he,W("]"),be):"("==e?E(Re,be):e.match(/[;\}\)\],]/)?void 0:S()}function we(e,t){return"quasi"!=e?E():"${"!=t.slice(t.length-2)?S(we):S(ge,xe)}function xe(e){if("}"==e)return M.marked="string-2",M.state.tokenize=b,S(we)}function Ce(e,t){return"variable"==e&&M.stream.match(/^\s*[?:]/,!1)||"?"==t?S(Ce):":"==e?S(ge):"spread"==e?S(Ce):E(ge)}function je(e,t){return"<"==t?S(q(">"),de(ge,">"),H,je):"|"==t||"."==e||"&"==t?S(ge):"["==e?S(ge,W("]"),je):"extends"==t||"implements"==t?(M.marked="keyword",S(ge)):"?"==t?S(ge,W(":"),ge):void 0}function De(e,t){if("<"==t)return S(q(">"),de(ge,">"),H,je)}function Oe(){return E(ge,Me)}function Me(e,t){if("="==t)return S(ge)}function Ee(e,t){return"enum"==t?(M.marked="keyword",S(tt)):E(Se,fe,Ae,Pe)}function Se(e,t){return d&&P(t)?(M.marked="keyword",S(Se)):"variable"==e?(U(t),S()):"spread"==e?S(Se):"["==e?pe(Ue,"]"):"{"==e?pe(Ve,"}"):void 0}function Ve(e,t){return"variable"!=e||M.stream.match(/^\s*:/,!1)?("variable"==e&&(M.marked="property"),"spread"==e?S(Se):"}"==e?E():"["==e?S(B,W("]"),W(":"),Ve):S(W(":"),Se,Ae)):(U(t),S(Ae))}function Ue(){return E(Se,Ae)}function Ae(e,t){if("="==t)return S(K)}function Pe(e){if(","==e)return S(Ee)}function _e(e,t){if("keyword b"==e&&"else"==t)return S(q("form","else"),L,H)}function Ie(e,t){return"await"==t?S(Ie):"("==e?S(q(")"),Ne,H):void 0}function Ne(e){return"var"==e?S(Ee,Te):"variable"==e?S(Te):E(Te)}function Te(e,t){return")"==e?S():";"==e?S(Te):"in"==t||"of"==t?(M.marked="keyword",S(B,Te)):E(B,Te)}function ze(e,t){return"*"==t?(M.marked="keyword",S(ze)):"variable"==e?(U(t),S(ze)):"("==e?S(T,q(")"),de(He,")"),H,me,L,R):d&&"<"==t?S(q(">"),de(Oe,">"),H,ze):void 0}function Re(e,t){return"*"==t?(M.marked="keyword",S(Re)):"variable"==e?(U(t),S(Re)):"("==e?S(T,q(")"),de(He,")"),H,me,R):d&&"<"==t?S(q(">"),de(Oe,">"),H,Re):void 0}function qe(e,t){return"keyword"==e||"variable"==e?(M.marked="type",S(qe)):"<"==t?S(q(">"),de(Oe,">"),H):void 0}function He(e,t){return"@"==t&&S(B,He),"spread"==e?S(He):d&&P(t)?(M.marked="keyword",S(He)):d&&"this"==e?S(fe,Ae):E(Se,fe,Ae)}function We(e,t){return"variable"==e?Le(e,t):$e(e,t)}function Le(e,t){if("variable"==e)return U(t),S($e)}function $e(e,t){return"<"==t?S(q(">"),de(Oe,">"),H,$e):"extends"==t||"implements"==t||d&&","==e?("implements"==t&&(M.marked="keyword"),S(d?ge:B,$e)):"{"==e?S(q("}"),Be,H):void 0}function Be(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||d&&P(t))&&M.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(M.marked="keyword",S(Be)):"variable"==e||"keyword"==M.style?(M.marked="property",S(Ke,Be)):"number"==e||"string"==e?S(Ke,Be):"["==e?S(B,fe,W("]"),Ke,Be):"*"==t?(M.marked="keyword",S(Be)):d&&"("==e?E(Re,Be):";"==e||","==e?S(Be):"}"==e?S():"@"==t?S(B,Be):void 0}function Ke(e,t){if("!"==t)return S(Ke);if("?"==t)return S(Ke);if(":"==e)return S(ge,Ae);if("="==t)return S(K);var r=M.state.lexical.prev;return E(r&&"interface"==r.info?Re:ze)}function Fe(e,t){return"*"==t?(M.marked="keyword",S(Ze,W(";"))):"default"==t?(M.marked="keyword",S(B,W(";"))):"{"==e?S(de(Ge,"}"),Ze,W(";")):E(L)}function Ge(e,t){return"as"==t?(M.marked="keyword",S(W("variable"))):"variable"==e?E(K,Ge):void 0}function Je(e){return"string"==e?S():"("==e?E(B):"."==e?E(Q):E(Qe,Xe,Ze)}function Qe(e,t){return"{"==e?pe(Qe,"}"):("variable"==e&&U(t),"*"==t&&(M.marked="keyword"),S(Ye))}function Xe(e){if(","==e)return S(Qe,Xe)}function Ye(e,t){if("as"==t)return M.marked="keyword",S(Qe)}function Ze(e,t){if("from"==t)return M.marked="keyword",S(B)}function et(e){return"]"==e?S():E(de(K,"]"))}function tt(){return E(q("form"),Se,W("{"),q("}"),de(rt,"}"),H,H)}function rt(){return E(Se,Ae)}function nt(e,t){return"operator"==e.lastType||","==e.lastType||f.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}function ot(e,t,r){return t.tokenize==g&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return R.lex=!0,H.lex=!0,{startState:function(e){var t={tokenize:g,lastType:"sof",cc:[],lexical:new j((e||0)-i,0,"block",!1),localVars:r.localVars,context:r.localVars&&new _(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),x(e,t)),t.tokenize!=k&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==n?r:(t.lastType="operator"!=n||"++"!=o&&"--"!=o?n:"incdec",O(t,r,n,o,e))},indent:function(t,n){if(t.tokenize==k||t.tokenize==b)return e.Pass;if(t.tokenize!=g)return 0;var o,s=n&&n.charAt(0),c=t.lexical;if(!/^\s*else\b/.test(n))for(var u=t.cc.length-1;u>=0;--u){var d=t.cc[u];if(d==H)c=c.prev;else if(d!=_e&&d!=R)break}for(;("stat"==c.type||"form"==c.type)&&("}"==s||(o=t.cc[t.cc.length-1])&&(o==Q||o==X)&&!/^[,\.=+\-*:?[\(]/.test(n));)c=c.prev;a&&")"==c.type&&"stat"==c.prev.type&&(c=c.prev);var p=c.type,l=s==p;return"vardef"==p?c.indented+("operator"==t.lastType||","==t.lastType?c.info.length+1:0):"form"==p&&"{"==s?c.indented:"form"==p?c.indented+i:"stat"==p?c.indented+(nt(t,n)?a||i:0):"switch"!=c.info||l||0==r.doubleIndentSwitch?c.align?c.column+(l?0:1):c.indented+(l?0:i):c.indented+(/^(?:case|default)\b/.test(n)?i:2*i)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:c?null:"/*",blockCommentEnd:c?null:"*/",blockCommentContinue:c?null:" * ",lineComment:c?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:c?"json":"javascript",jsonldMode:s,jsonMode:c,expressionAllowed:ot,skipExpression:function(t){O(t,"atom","atom","true",new e.StringStream("",2,null))}}})),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/manifest+json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})}(r("VrN/"))},"0ujT":function(e,t,r){},a2PE:function(e,t,r){"use strict";(function(e){function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function o(e){return(o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0}),t.UnControlled=t.Controlled=void 0;var a,s=r("q1tI"),c="undefined"===typeof navigator||!0===e.PREVENT_CODEMIRROR_RENDER;c||(a=r("VrN/"));var u=function(){function e(){}return e.equals=function(e,t){var r=this,n=Object.keys,i=o(e),a=o(t);return e&&t&&"object"===i&&i===a?n(e).length===n(t).length&&n(e).every((function(n){return r.equals(e[n],t[n])})):e===t},e}(),d=function(){function e(e,t){this.editor=e,this.props=t}return e.prototype.delegateCursor=function(e,t,r){var n=this.editor.getDoc();r&&this.editor.focus(),t?n.setCursor(e):n.setCursor(e,null,{scroll:!1})},e.prototype.delegateScroll=function(e){this.editor.scrollTo(e.x,e.y)},e.prototype.delegateSelection=function(e,t){this.editor.getDoc().setSelections(e),t&&this.editor.focus()},e.prototype.apply=function(e){e&&e.selection&&e.selection.ranges&&this.delegateSelection(e.selection.ranges,e.selection.focus||!1),e&&e.cursor&&this.delegateCursor(e.cursor,e.autoScroll||!1,this.editor.getOption("autofocus")||!1),e&&e.scroll&&this.delegateScroll(e.scroll)},e.prototype.applyNext=function(e,t,r){e&&e.selection&&e.selection.ranges&&t&&t.selection&&t.selection.ranges&&!u.equals(e.selection.ranges,t.selection.ranges)&&this.delegateSelection(t.selection.ranges,t.selection.focus||!1),e&&e.cursor&&t&&t.cursor&&!u.equals(e.cursor,t.cursor)&&this.delegateCursor(r.cursor||t.cursor,t.autoScroll||!1,t.autoCursor||!1),e&&e.scroll&&t&&t.scroll&&!u.equals(e.scroll,t.scroll)&&this.delegateScroll(t.scroll)},e.prototype.applyUserDefined=function(e,t){t&&t.cursor&&this.delegateCursor(t.cursor,e.autoScroll||!1,this.editor.getOption("autofocus")||!1)},e.prototype.wire=function(e){var t=this;Object.keys(e||{}).filter((function(e){return/^on/.test(e)})).forEach((function(e){switch(e){case"onBlur":t.editor.on("blur",(function(e,r){t.props.onBlur(t.editor,r)}));break;case"onContextMenu":t.editor.on("contextmenu",(function(e,r){t.props.onContextMenu(t.editor,r)}));break;case"onCopy":t.editor.on("copy",(function(e,r){t.props.onCopy(t.editor,r)}));break;case"onCursor":t.editor.on("cursorActivity",(function(e){t.props.onCursor(t.editor,t.editor.getDoc().getCursor())}));break;case"onCursorActivity":t.editor.on("cursorActivity",(function(e){t.props.onCursorActivity(t.editor)}));break;case"onCut":t.editor.on("cut",(function(e,r){t.props.onCut(t.editor,r)}));break;case"onDblClick":t.editor.on("dblclick",(function(e,r){t.props.onDblClick(t.editor,r)}));break;case"onDragEnter":t.editor.on("dragenter",(function(e,r){t.props.onDragEnter(t.editor,r)}));break;case"onDragLeave":t.editor.on("dragleave",(function(e,r){t.props.onDragLeave(t.editor,r)}));break;case"onDragOver":t.editor.on("dragover",(function(e,r){t.props.onDragOver(t.editor,r)}));break;case"onDragStart":t.editor.on("dragstart",(function(e,r){t.props.onDragStart(t.editor,r)}));break;case"onDrop":t.editor.on("drop",(function(e,r){t.props.onDrop(t.editor,r)}));break;case"onFocus":t.editor.on("focus",(function(e,r){t.props.onFocus(t.editor,r)}));break;case"onGutterClick":t.editor.on("gutterClick",(function(e,r,n,o){t.props.onGutterClick(t.editor,r,n,o)}));break;case"onInputRead":t.editor.on("inputRead",(function(e,r){t.props.onInputRead(t.editor,r)}));break;case"onKeyDown":t.editor.on("keydown",(function(e,r){t.props.onKeyDown(t.editor,r)}));break;case"onKeyHandled":t.editor.on("keyHandled",(function(e,r,n){t.props.onKeyHandled(t.editor,r,n)}));break;case"onKeyPress":t.editor.on("keypress",(function(e,r){t.props.onKeyPress(t.editor,r)}));break;case"onKeyUp":t.editor.on("keyup",(function(e,r){t.props.onKeyUp(t.editor,r)}));break;case"onMouseDown":t.editor.on("mousedown",(function(e,r){t.props.onMouseDown(t.editor,r)}));break;case"onPaste":t.editor.on("paste",(function(e,r){t.props.onPaste(t.editor,r)}));break;case"onRenderLine":t.editor.on("renderLine",(function(e,r,n){t.props.onRenderLine(t.editor,r,n)}));break;case"onScroll":t.editor.on("scroll",(function(e){t.props.onScroll(t.editor,t.editor.getScrollInfo())}));break;case"onSelection":t.editor.on("beforeSelectionChange",(function(e,r){t.props.onSelection(t.editor,r)}));break;case"onTouchStart":t.editor.on("touchstart",(function(e,r){t.props.onTouchStart(t.editor,r)}));break;case"onUpdate":t.editor.on("update",(function(e){t.props.onUpdate(t.editor)}));break;case"onViewportChange":t.editor.on("viewportChange",(function(e,r,n){t.props.onViewportChange(t.editor,r,n)}))}}))},e}(),p=function(e){function t(t){var r=e.call(this,t)||this;return c||(r.applied=!1,r.appliedNext=!1,r.appliedUserDefined=!1,r.deferred=null,r.emulating=!1,r.hydrated=!1,r.initCb=function(){r.props.editorDidConfigure&&r.props.editorDidConfigure(r.editor)},r.mounted=!1),r}return i(t,e),t.prototype.hydrate=function(e){var t=this,r=e&&e.options?e.options:{},o=n({},a.defaults,this.editor.options,r);Object.keys(o).some((function(e){return t.editor.getOption(e)!==o[e]}))&&Object.keys(o).forEach((function(e){r.hasOwnProperty(e)&&t.editor.getOption(e)!==o[e]&&(t.editor.setOption(e,o[e]),t.mirror.setOption(e,o[e]))})),this.hydrated||(this.deferred?this.resolveChange(e.value):this.initChange(e.value||"")),this.hydrated=!0},t.prototype.initChange=function(e){this.emulating=!0;var t=this.editor.getDoc(),r=t.lastLine(),n=t.getLine(t.lastLine()).length;t.replaceRange(e||"",{line:0,ch:0},{line:r,ch:n}),this.mirror.setValue(e),t.clearHistory(),this.mirror.clearHistory(),this.emulating=!1},t.prototype.resolveChange=function(e){this.emulating=!0;var t=this.editor.getDoc();if("undo"===this.deferred.origin?t.undo():"redo"===this.deferred.origin?t.redo():t.replaceRange(this.deferred.text,this.deferred.from,this.deferred.to,this.deferred.origin),e&&e!==t.getValue()){var r=t.getCursor();t.setValue(e),t.setCursor(r)}this.emulating=!1,this.deferred=null},t.prototype.mirrorChange=function(e){var t=this.editor.getDoc();return"undo"===e.origin?(t.setHistory(this.mirror.getHistory()),this.mirror.undo()):"redo"===e.origin?(t.setHistory(this.mirror.getHistory()),this.mirror.redo()):this.mirror.replaceRange(e.text,e.from,e.to,e.origin),this.mirror.getValue()},t.prototype.componentDidMount=function(){var e=this;c||(this.props.defineMode&&this.props.defineMode.name&&this.props.defineMode.fn&&a.defineMode(this.props.defineMode.name,this.props.defineMode.fn),this.editor=a(this.ref,this.props.options),this.shared=new d(this.editor,this.props),this.mirror=a((function(){}),this.props.options),this.editor.on("electricInput",(function(){e.mirror.setHistory(e.editor.getDoc().getHistory())})),this.editor.on("cursorActivity",(function(){e.mirror.setCursor(e.editor.getDoc().getCursor())})),this.editor.on("beforeChange",(function(t,r){if(!e.emulating){r.cancel(),e.deferred=r;var n=e.mirrorChange(e.deferred);e.props.onBeforeChange&&e.props.onBeforeChange(e.editor,e.deferred,n)}})),this.editor.on("change",(function(t,r){e.mounted&&e.props.onChange&&e.props.onChange(e.editor,r,e.editor.getValue())})),this.hydrate(this.props),this.shared.apply(this.props),this.applied=!0,this.mounted=!0,this.shared.wire(this.props),this.editor.getOption("autofocus")&&this.editor.focus(),this.props.editorDidMount&&this.props.editorDidMount(this.editor,this.editor.getValue(),this.initCb))},t.prototype.componentDidUpdate=function(e){if(!c){var t={cursor:null};this.props.value!==e.value&&(this.hydrated=!1),this.props.autoCursor||void 0===this.props.autoCursor||(t.cursor=this.editor.getDoc().getCursor()),this.hydrate(this.props),this.appliedNext||(this.shared.applyNext(e,this.props,t),this.appliedNext=!0),this.shared.applyUserDefined(e,t),this.appliedUserDefined=!0}},t.prototype.componentWillUnmount=function(){c||this.props.editorWillUnmount&&this.props.editorWillUnmount(a)},t.prototype.shouldComponentUpdate=function(e,t){return!c},t.prototype.render=function(){var e=this;if(c)return null;var t=this.props.className?"react-codemirror2 "+this.props.className:"react-codemirror2";return s.createElement("div",{className:t,ref:function(t){return e.ref=t}})},t}(s.Component);t.Controlled=p;var l=function(e){function t(t){var r=e.call(this,t)||this;return c||(r.applied=!1,r.appliedUserDefined=!1,r.continueChange=!1,r.detached=!1,r.hydrated=!1,r.initCb=function(){r.props.editorDidConfigure&&r.props.editorDidConfigure(r.editor)},r.mounted=!1,r.onBeforeChangeCb=function(){r.continueChange=!0}),r}return i(t,e),t.prototype.hydrate=function(e){var t=this,r=e&&e.options?e.options:{},o=n({},a.defaults,this.editor.options,r);if(Object.keys(o).some((function(e){return t.editor.getOption(e)!==o[e]}))&&Object.keys(o).forEach((function(e){r.hasOwnProperty(e)&&t.editor.getOption(e)!==o[e]&&t.editor.setOption(e,o[e])})),!this.hydrated){var i=this.editor.getDoc(),s=i.lastLine(),c=i.getLine(i.lastLine()).length;i.replaceRange(e.value||"",{line:0,ch:0},{line:s,ch:c})}this.hydrated=!0},t.prototype.componentDidMount=function(){var e=this;c||(this.detached=!0===this.props.detach,this.props.defineMode&&this.props.defineMode.name&&this.props.defineMode.fn&&a.defineMode(this.props.defineMode.name,this.props.defineMode.fn),this.editor=a(this.ref,this.props.options),this.shared=new d(this.editor,this.props),this.editor.on("beforeChange",(function(t,r){e.props.onBeforeChange&&e.props.onBeforeChange(e.editor,r,e.editor.getValue(),e.onBeforeChangeCb)})),this.editor.on("change",(function(t,r){e.mounted&&e.props.onChange&&(e.props.onBeforeChange?e.continueChange&&e.props.onChange(e.editor,r,e.editor.getValue()):e.props.onChange(e.editor,r,e.editor.getValue()))})),this.hydrate(this.props),this.shared.apply(this.props),this.applied=!0,this.mounted=!0,this.shared.wire(this.props),this.editor.getDoc().clearHistory(),this.props.editorDidMount&&this.props.editorDidMount(this.editor,this.editor.getValue(),this.initCb))},t.prototype.componentDidUpdate=function(e){if(this.detached&&!1===this.props.detach&&(this.detached=!1,e.editorDidAttach&&e.editorDidAttach(this.editor)),this.detached||!0!==this.props.detach||(this.detached=!0,e.editorDidDetach&&e.editorDidDetach(this.editor)),!c&&!this.detached){var t={cursor:null};this.props.value!==e.value&&(this.hydrated=!1,this.applied=!1,this.appliedUserDefined=!1),e.autoCursor||void 0===e.autoCursor||(t.cursor=this.editor.getDoc().getCursor()),this.hydrate(this.props),this.applied||(this.shared.apply(e),this.applied=!0),this.appliedUserDefined||(this.shared.applyUserDefined(e,t),this.appliedUserDefined=!0)}},t.prototype.componentWillUnmount=function(){c||this.props.editorWillUnmount&&this.props.editorWillUnmount(a)},t.prototype.shouldComponentUpdate=function(e,t){var r=!0;return c&&(r=!1),this.detached&&e.detach&&(r=!1),r},t.prototype.render=function(){var e=this;if(c)return null;var t=this.props.className?"react-codemirror2 "+this.props.className:"react-codemirror2";return s.createElement("div",{className:t,ref:function(t){return e.ref=t}})},t}(s.Component);t.UnControlled=l}).call(this,r("ntbh"))},ha0m:function(e,t,r){"use strict";r.r(t);var n=r("nKUr"),o=r("cpVT"),i=(r("q1tI"),r("a2PE")),a=r("VrN/"),s=r.n(a);r("p77/"),r("0ujT"),r("+dQi");function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.default=function(e){return s.a.defineMode("rexs",(function(){return{startState:function(){return{stage:0,depth:0}},token:function(e,t){return 0===t.stage?(e.eatSpace(),"}"===e.peek()?(t.depth--,e.next(),"operator"):(e.eol()||(t.stage=1),null)):1===t.stage?(e.eatWhile((function(e){return"("!==e})),t.stage=2,"variable"):2===t.stage?(e.next(),t.stage=3,"operator"):3===t.stage?(e.eatWhile((function(e){return")"!==e})),t.stage=4,"keyword"):4===t.stage?(e.next(),t.stage=5,"operator"):5===t.stage?(e.eatWhile((function(t){return!e.eol()&&![";","{"].includes(t)})),"{"===e.next()&&t.depth++,t.stage=0,"operator"):void 0},indent:function(e,t){return console.log(t,t.split("").filter((function(e){return"}"===e}))),Math.max(4*(e.depth-t.split("").filter((function(e){return"}"===e})).length),0)}}})),Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(i.UnControlled,u(u({},e),{},{value:e.value,options:{theme:"material",mode:"rexs",lineNumbers:!0,gutter:!0,lineWrapping:!0},onChange:function(){return null},lineNumbers:!0,gutter:!0,lineWrapping:!0}))})}},"p77/":function(e,t,r){}}]);