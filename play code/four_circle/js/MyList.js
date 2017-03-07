/*
*
*    点击顶部换颜色
*	 换颜色同时换页面的内容
*
*
*/
window.onload = function() {
	var myanswer_content = new MAContent('myAC','tabs');
	myanswer_content.MAC_position();
}
function MAContent(className1,className2) {
	this.myAC = document.getElementsByClassName(className1)[0];
	this.MA_tab = document.getElementsByClassName(className2)[0];
	this.MA_bottons = this.MA_tab.getElementsByTagName('a');
	this.MAC_mains = this.myAC.children;
	this.MAC_mainsWidth = this.MAC_mains[0].offsetWidth;
}
MAContent.prototype = {
	constructor : MAContent,
	MAC_position : function() {
		var that = this;
		var num = 0;
		//  确定刚开始的 3个 div 和顶部颜色的位置
		this.myAC.style.width = this.MAC_mains[0].offsetWidth+'px';
		this.myAC.style.height = this.MAC_mains[0].offsetHeight+'px';
		for(var i=0;i<this.MAC_mains.length;i++){
			this.MAC_mains[i].style.transform = 'translateX('+this.MAC_mainsWidth*(i)+'px)';
			// 存储索引值 
			this.MA_bottons[i].index = i;
			// 点击换颜色并确定显示高度
			this.MA_bottons[i].onclick = function() {
				for(var j=0;j<that.MA_bottons.length;j++){
					that.MA_bottons[j].className = '';
				}
				this.className = 'active';
				that.myAC.style.height = that.MAC_mains[this.index].offsetHeight+'px';
				// 点击按钮后，判断 div 是向左还是向右
				if(num < this.index){
					// 判断从第一个按钮点到最后一个按钮
					num = this.index==that.MA_bottons.length-1?this.index-1:num;
					// div向左
					num++;
					for(var k=0;k<that.MAC_mains.length;k++){
						// 清除过渡效果
						that.MAC_mains[k].style.transition = 'none';
						// 添加过渡效果
						that.MAC_mains[k].style.transition = 'all 1s';
						that.MAC_mains[k].style.transform = 'translateX('+(that.MAC_mainsWidth*k-that.myAC.offsetWidth*num)+'px)';
					}
				}else if(num > this.index){
					if(this.index==0){
					// 判断从最后一个按钮点到第一个按钮
						num = this.index-1;
					}else if(num==that.MA_bottons.length-1){
					// 判断是否从最后一个按钮向左点击
					// 这里最后一个索引值为2
						num = 0;
					}
					// div向右
					num++;
					for(var k=0;k<that.MAC_mains.length;k++){
						that.MAC_mains[k].style.transition = 'none';
						that.MAC_mains[k].style.transition = 'all 1s';
						that.MAC_mains[k].style.transform = 'translateX('+(that.MAC_mainsWidth*k+that.myAC.offsetWidth*(-num))+'px)';
					}
				}
			}
		}
		this.MAC_change_position();
	},
	MAC_change_position : function() {
		var that = this;
		var cs = null;
		// 根据屏幕改变大小改变自身大小
		window.onresize = function() {
			for(var i = 0;i<that.MAC_mains.length;i++){
				cs = that.MAC_mains[i].offsetWidth;
				that.MAC_mains[i].style.transform = 'translateX('+cs*(i)+'px)';
				// 判断是哪个 div 在当前屏幕 
				// 处理我恶心的布局BUG...固定宽高
				if(that.MAC_mains[i].style.transform==='translateX(0px)'){
					if(window.innerWidth>='640'){
						that.myAC.style.width = '640px';
						// 570 - 625 这段BUG布局不知发生毛线事，暂时固定 578 处理 
					}else if(window.innerWidth>'570'&&window.innerWidth<'630'){
						that.myAC.style.width = '578px';	
					}else if(window.innerWidth<='320'){
						that.myAC.style.width = '320px';
					}else {
						that.myAC.style.width = window.innerWidth+'px';
					}
					that.myAC.style.height = that.MAC_mains[i].offsetHeight+'px';
				}
			}
		}
		// this.myAC.addEventListener('touchstart',function(e){
		// 	console.log(e.target);
		// });
		// this.myAC.addEventListener('touchmove',function(e){
		// 	console.log(e);
		// });
		// this.myAC.addEventListener('touchend',function(e){
		// 	console.log(e.target);
		// });
	}
}