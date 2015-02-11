jQuery(function($){
	//class name setting
	var CLASS = {
		wrap:'JStabchangeWrap',
		tab:'menuTab',
		area:'menuList',
		tabOn:'tabOn'
	}
	
	$('.'+CLASS.wrap).each(function(){
		new tabchange(this);
	})
	function tabchange(wrap){
		var thisE = this;
		this.$wrap = $(wrap);
		this.tabs = [];
		this.areas = [];
		
		//get tab
		this.$wrap.find('[class*= '+CLASS.tab+']').each(function(){
			var key = getClassOption(this,CLASS.tab);
			if(key){thisE.tabs.push([this,key[0]]);}
		});
		//get area
		this.$wrap.find('[class*= '+CLASS.area+']').each(function(){
			var key = getClassOption(this,CLASS.area);
			if(key){thisE.areas.push([this,key[0]]);}
		});
		//set event
		for(var i=0;i<this.tabs.length;i++){
			(function(tab,key){
				$(tab).add($(tab).children()).filter('a').click(function(){thisE.tabClicked(key);});
			})(this.tabs[i][0],this.tabs[i][1]);
		}
	}
	tabchange.prototype.tabClicked = function(key){
		//tab action
		for(var i=0;i<this.tabs.length;i++){
			if(this.tabs[i][1] == key){
				$(this.tabs[i][0]).addClass(CLASS.tabOn);
			}else{
				$(this.tabs[i][0]).removeClass(CLASS.tabOn);
			}
		}
		//area action
		for(var i=0;i<this.areas.length;i++){	
			if(this.areas[i][1] == key){
				$(this.areas[i][0]).css('display','block');
			}
			else{
				$(this.areas[i][0]).css('display','none');
			}
		}
	}
	
	
	function getClassOption(Elm,keyClass){
		var classes = Elm.className.split(' ');
		var result = null;
		for(var i=0;i<classes.length;i++){
			if(classes[i].indexOf(keyClass+'-') == 0){
				var splitArr = classes[i].split('-');
				if(splitArr.length>1){
					result = splitArr.slice(1);
					break;
				}
			}
		}
		return result;
	}
	
});