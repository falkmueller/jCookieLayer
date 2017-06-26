function jCookieLayer(options){
    
    var defaults = {
            text: 'Cookies help us deliver our services. By using our services, you agree to our use of cookies.',
            template: '<div class="jcl">\n\
                            <span class="jcl-text"></span><a class="jcl-exit"></a>\n\
                       </div>',
            closeIcon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve"><polygon fill="#AAAAAB" points="96,14 82,0 48,34 14,0 0,14 34,48 0,82 14,96 48,62 82,96 96,82 62,48 "/></svg>',
            css: {
             '.jcl': 'box-sizing:border-box; width: 100%; text-align: center; background: rgba(0, 0, 0, 0.5); color: white; font-size: 11px; z-index: 1000; line-height: 20px; margin: 0; padding: 0;',
             '.jcl-fixed-bottom': 'position: fixed; bottom: 0; left: 0;',
             '.jcl-fixed-top': 'position: fixed;top: 0; left: 0;',
             '.jcl-top': '',
             '.jcl-text': 'display: inline-block;line-height: 20px;vertical-align: middle;',
             '.jcl-exit': 'vertical-align: middle; box-sizing:border-box; display: inline-block; width: 20px; height: 20px; background: rgba(0, 0, 0, 0.5); margin-left: 10px; text-align: center;line-height: 20px;cursor: pointer;',
             '.jcl-exit svg': ' margin-top: 2px;width: 16px;height: 16px;'
            },
            position: "fixed-bottom",
            cookieName: "jcl_seen",
            cookieDays: 365,
            hideOnScroll: 0,
            withInlineStyle: true,
            bodyClass: 'jcl-visible'
    };
    
    this.settings = $.extend( {}, defaults, options );
    
    //get Cookie content
    this.getCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};
	
    // Set cookie
    this.setCookie = function(name,value,days) {
            var expires = "";
            if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires="+date.toGMTString();
            }
            document.cookie = name+"="+value+expires+"; path=/";
    };
    
    //hide layer on Scoll
    this.onScoll = function(){
        if($(document).scrollTop() > this.settings.hideOnScroll){
               $(this.layer).hide();
           } else {
               $(this.layer).show();
           }
    }
    
    //remove layer and set cookie
    this.onClose= function(){
        this.layer.remove();
         this.setCookie(this.settings.cookieName, 1, this.settings.cookieDays);
    }
    
    //add layer
    this.addLayer = function(){
        if(this.layer){
            return;
        }
        
        this.layer = $(this.settings.template);
    
        $('.jcl-text', this.layer).html(this.settings.text);
        $(".jcl-exit", this.layer).html(this.settings.closeIcon);

        if(this.settings.withInlineStyle){
            $(this.layer).attr('style', this.settings.css['.jcl']);
            $('.jcl-text', this.layer).attr('style', this.settings.css['.jcl-text']);
            $('.jcl-exit', this.layer).attr('style', this.settings.css['.jcl-exit']);
            $('.jcl-exit svg', this.layer).attr('style', this.settings.css['.jcl-exit svg']);
        }

        $(".jcl-exit", this.layer).click($.proxy(this.onClose, this));

        if(this.settings.hideOnScroll > 0){
            $(document).on("scroll.jcl", $.proxy(this.onScoll, this) );
        }

        if(this.settings.position == "fixed-top"){
            $("body").prepend(this.layer);
            $(this.layer).attr('style', ($(this.layer).attr('style') ? $(this.layer).attr('style') + ';' : '') + this.settings.css['.jcl-fixed-top']);
        }
        else if(this.settings.position == "top"){
            $("body").prepend(this.layer);
            $(this.layer).attr('style', ($(this.layer).attr('style') ? $(this.layer).attr('style') + ';'  : '') + this.settings.css['.jcl-top']);
        } 
        else {
            $(this.layer).attr('style', ($(this.layer).attr('style') ? $(this.layer).attr('style') + ';'  : '') + this.settings.css['.jcl-fixed-bottom']);
            $("body").append(this.layer);
        }
        
        if(this.settings.bodyClass && this.settings.bodyClass.length > 0){
            $("body").addClass(this.settings.bodyClass);
        }
    }
    
    /*set Layer*/
    if(!this.getCookie(this.settings.cookieName)) {
         this.addLayer();
    }
    
    return this;
}