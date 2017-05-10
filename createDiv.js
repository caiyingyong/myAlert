/**
 * Created by lenovo on 2017/2/7.
 */

(function () {
    var AppendHtml = function () {
        this.configs = {
            width:500,
            height:200,
            title:'标题',
            titleBg:'red',
            titleColor:'blue',
            borderRadius:'0px',
            content:'内容区域',
            drag:false
        };
    };
    AppendHtml.fn = AppendHtml.prototype = {
        obj:function (config) {
            if(config && config instanceof Object){ //是object
                for(var i in config){
                    this.configs[i] = config[i];
                }
            }
        },
        init:function () {
            var configs = this.configs,buttons = configs.buttons;
            var dom = document.createElement('div');
            var html = '<div class="window_mask"></div>' +
                '<div class="window_content" ' +
                'style="width:'+configs.width+'px;height:'+configs.height+'px;border-radius:'+configs.borderRadius+'">' +
                '<div style="background:'+configs.titleBg+';color:'+configs.titleColor+';">'+this.configs.title+'</div>' +
                '<div>'+configs.content+'</div><div class="align">';
            for(var i = 0;i < buttons.length;i++){
                if(buttons[i].text){
                    html += "<button>"+buttons[i].text+"</button>";
                }
            }
            html += '</div></div>';
            dom.innerHTML = html;
            document.body.appendChild(dom);

            for(var j = 0;j < dom.getElementsByTagName('button').length;j++){
                (function (j) {
                    dom.getElementsByTagName('button')[j].onclick = function (e) {
                        if (buttons[j].close !== false){
                            dom.parentNode.removeChild(dom)
                        }
                        if(buttons[j].onClick){
                            buttons[j].onClick(dom,e);
                        }
                    }
                })(j);
            }
            return dom;
        },
        modal: function (config) {
            this.obj(config);
            this.init(config);
        }
    };
    window.myAlert = new AppendHtml();
    // "function" === typeof define ? define(function() {
    //     return alertDiv;
    // }) : "undefined" != typeof exports ? module.exports = alertDiv : window.taxon = alertDiv;
})();
//modal 用法
// myAlert.modal({
//     width:100,
//     height:100,
//     buttons:[
//         {
//             text:'---',
//             onClick:function () {
//                 console.log('---');
//             }
//         },{
//             text:'++',
//             onClick:function () {
//                 console.log('++');
//             }
//         }
//     ]
// });