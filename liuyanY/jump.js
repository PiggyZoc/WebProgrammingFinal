var jq=$.noConflict();
jq(document).ready(function(){
   jq('input#go').on('click',exec);
  
});

var exec=function(){

	var name=jq('input.input').val();
	jq.ajax({
    url:'getname.php',
    type:'GET', //GET
    async:false,    //或false,是否异步
    data:{
    	name:name
    },
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    beforeSend:function(xhr){
       
    },
    success:function(data,textStatus,jqXHR){
        if(data=='1')

           { console.log(1);
           	jq(window).attr('location','http://120.24.42.137/liuyanZ/');}
       
    },
    error:function(xhr,textStatus){
      
    },
    complete:function(){
        
    }
});

}