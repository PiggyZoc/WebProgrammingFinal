var jq=$.noConflict();

jq(document).ready(function(){
   init();
   jq('#btn').on('click',exec);
});
var obj;
var exec=function(){
	var name=jq('#input').val();
	jq.ajax({
    url:'test.php',
    type:'GET', //GET
    async:true,    //或false,是否异步
    data:{
    	name:name
    },
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    beforeSend:function(xhr){
        console.log(xhr)
        console.log('发送前')
    },
    success:function(data,textStatus,jqXHR){
        console.log(data)

        obj=data;
        update();
        console.log(textStatus)
        console.log(jqXHR)
    },
    error:function(xhr,textStatus){
        console.log('错误')
        console.log(xhr)
        console.log(textStatus)
    },
    complete:function(){
        console.log('结束')
    }
});
};

var init=function(){
    console.log(1);
    jq.ajax({
    url:'init.php',
    type:'GET', //GET
    async:true,    //或false,是否异步
  
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    beforeSend:function(xhr){
        console.log(xhr)
        console.log('发送前')
    },
    success:function(data,textStatus,jqXHR){
        console.log(data)

        obj=data;
        update();
        console.log(textStatus)
        console.log(jqXHR)
    },
    error:function(xhr,textStatus){
        console.log('错误')
        console.log(xhr)
        console.log(textStatus)
    },
    complete:function(){
        console.log('结束')
    }
});
}

var update=function(){
   jq('.super').empty();
    jq('.super').slideUp('slow');
    
    for(var i=0;i<obj.result.songs.length;i++){
        var box=jq('<div></div>');
        var top=jq('<div></div>');
        var img=jq('<img/>');
       
        var bottom=jq('<div></div>');
        var audio=jq('<audio></audio>');
        var text=jq('<div></div>');
        box.addClass('box').append(top).append(bottom);
       
        top.addClass('top').append(img);

        img.attr({
            'src':obj.result.songs[i].album.picUrl,
            'alt':'pic'
        });
        bottom.addClass('bottom').append(audio).append(text);
        audio.attr({
            'src':obj.result.songs[i].mp3Url,
            'preload':'auto'
        });
        audio.load();
    
        text.addClass('text').text(obj.result.songs[i].name);
        jq('.super').append(box);
    }
    jq('audio').audioPlayer();
    jq('.super').slideDown(6000);
}


;(function( $, window, document, undefined )
        {   
        var isTouch       = 'ontouchstart' in window,
        eStart        = isTouch ? 'touchstart'  : 'mousedown',
        eMove         = isTouch ? 'touchmove'   : 'mousemove',
        eEnd          = isTouch ? 'touchend'    : 'mouseup',
        eCancel       = isTouch ? 'touchcancel' : 'mouseup',
        secondsToTime = function( secs )
        {
            var hoursDiv = secs / 3600, hours = Math.floor( hoursDiv ), minutesDiv = secs % 3600 / 60, minutes = Math.floor( minutesDiv ), seconds = Math.ceil( secs % 3600 % 60 );
            if( seconds > 59 ) { seconds = 0; minutes = Math.ceil( minutesDiv ); }
            if( minutes > 59 ) { minutes = 0; hours = Math.ceil( hoursDiv ); }
            return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
        },
        canPlayType   = function( file )
        {
            var audioElement = document.createElement( 'audio' );
            return !!( audioElement.canPlayType && audioElement.canPlayType( 'audio/' + file.split( '.' ).pop().toLowerCase() + ';' ).replace( /no/, '' ) );
        };

        $.fn.audioPlayer = function( params )
        {
            var params      = $.extend( { classPrefix: 'audioplayer', strPlay: 'Play', strPause: 'Pause', strVolume: 'Volume' }, params ),
            cssClass    = {},
            cssClassSub =
            {
                playPause:      'playpause',
                playing:        'playing',
                stopped:        'stopped',
                
                bar:            'bar',
                barLoaded:      'bar-loaded',
                barPlayed:      'bar-played',
                volume:         'volume',
                volumeButton:   'volume-button',
                volumeAdjust:   'volume-adjust',
                noVolume:       'novolume',
                muted:          'muted',
                mini:           'mini'
            };

            for( var subName in cssClassSub )
                cssClass[ subName ] = params.classPrefix + '-' + cssClassSub[ subName ];

            this.each( function()
            {
                if( $( this ).prop( 'tagName' ).toLowerCase() != 'audio' )
                    return false;

                var $this      = $( this ),
                audioFile  = $this.attr( 'src' ),
                isAutoPlay = $this.get( 0 ).getAttribute( 'autoplay' ), isAutoPlay = isAutoPlay === '' || isAutoPlay === 'autoplay' ? true : false,
                isLoop     = $this.get( 0 ).getAttribute( 'loop' ),     isLoop     = isLoop     === '' || isLoop     === 'loop'     ? true : false,
                isSupport  = false;

                if( typeof audioFile === 'undefined' )
                {
                    $this.find( 'source' ).each( function()
                    {
                        audioFile = $( this ).attr( 'src' );
                        if( typeof audioFile !== 'undefined' && canPlayType( audioFile ) )
                        {
                            isSupport = true;
                            return false;
                        }
                    });
                }
                else if( canPlayType( audioFile ) ) isSupport = true;

                var thePlayer = $( '<div class="' + params.classPrefix + '">' + ( isSupport ? $( '<div>' ).append( $this.eq( 0 ).clone() ).html() : '<embed src="' + audioFile + '" width="0" height="0" volume="100" autostart="' + isAutoPlay.toString() +'" loop="' + isLoop.toString() + '" />' ) + '<div class="' + cssClass.playPause + '" title="' + params.strPlay + '"><a href="#">' + params.strPlay + '</a></div></div>' ),
                theAudio  = isSupport ? thePlayer.find( 'audio' ) : thePlayer.find( 'embed' ), theAudio = theAudio.get( 0 );

                if( isSupport )
                {
                    thePlayer.find( 'audio' ).css( { 'width': 0, 'height': 0, 'visibility': 'hidden' } );
            //  thePlayer.append( '<div class="' + cssClass.time + ' ' + cssClass.timeCurrent + '"></div><div class="' + cssClass.bar + '"><div class="' + cssClass.barLoaded + '"></div><div class="' + cssClass.barPlayed + '"></div></div><div class="' + cssClass.time + ' ' + cssClass.timeDuration + '"></div><div class="' + cssClass.volume + '"><div class="' + cssClass.volumeButton + '" title="' + params.strVolume + '"><a href="#">' + params.strVolume + '</a></div><div class="' + cssClass.volumeAdjust + '"><div><div></div></div></div></div>' );

            var theBar            = thePlayer.find( '.' + cssClass.bar ),
            barPlayed         = thePlayer.find( '.' + cssClass.barPlayed ),
            barLoaded         = thePlayer.find( '.' + cssClass.barLoaded ),

            volumeButton      = thePlayer.find( '.' + cssClass.volumeButton ),
            volumeAdjuster    = thePlayer.find( '.' + cssClass.volumeAdjust + ' > div' ),
            volumeDefault     = 0,
            adjustCurrentTime = function( e )
            {
                theRealEvent         = isTouch ? e.originalEvent.touches[ 0 ] : e;
                theAudio.currentTime = Math.round( ( theAudio.duration * ( theRealEvent.pageX - theBar.offset().left ) ) / theBar.width() );

            },
            adjustVolume = function( e )
            {
                theRealEvent    = isTouch ? e.originalEvent.touches[ 0 ] : e;
                theAudio.volume = Math.abs( ( theRealEvent.pageY - ( volumeAdjuster.offset().top + volumeAdjuster.height() ) ) / volumeAdjuster.height() );
            },
            updateLoadBar = function()
            {
                var interval = setInterval( function()
                {
                    if( theAudio.buffered.length < 1 ) return true;
                    barLoaded.width( ( theAudio.buffered.end( 0 ) / theAudio.duration ) * 100 + '%' );
                    if( Math.floor( theAudio.buffered.end( 0 ) ) >= Math.floor( theAudio.duration ) ) clearInterval( interval );
                }, 100 );
            };

            var volumeTestDefault = theAudio.volume, volumeTestValue = theAudio.volume = 0.111;
            if( Math.round( theAudio.volume * 1000 ) / 1000 == volumeTestValue ) theAudio.volume = volumeTestDefault;
            else thePlayer.addClass( cssClass.noVolume );



            theAudio.addEventListener( 'loadeddata', function()
            {
                updateLoadBar();

                volumeAdjuster.find( 'div' ).height( theAudio.volume * 100 + '%' );
                volumeDefault = theAudio.volume;
            });



            theAudio.addEventListener( 'volumechange', function()
            {
                volumeAdjuster.find( 'div' ).height( theAudio.volume * 100 + '%' );
                if( theAudio.volume > 0 && thePlayer.hasClass( cssClass.muted ) ) thePlayer.removeClass( cssClass.muted );
                if( theAudio.volume <= 0 && !thePlayer.hasClass( cssClass.muted ) ) thePlayer.addClass( cssClass.muted );
            });

            theAudio.addEventListener( 'ended', function()
            {
                thePlayer.removeClass( cssClass.playing ).addClass( cssClass.stopped );
            });

            theBar.on( eStart, function( e )
            {
                adjustCurrentTime( e );
                theBar.on( eMove, function( e ) { adjustCurrentTime( e ); } );
            })
            .on( eCancel, function()
            {
                theBar.unbind( eMove );
            });

            volumeButton.on( 'click', function()
            {
                if( thePlayer.hasClass( cssClass.muted ) )
                {
                    thePlayer.removeClass( cssClass.muted );
                    theAudio.volume = volumeDefault;
                }
                else
                {
                    thePlayer.addClass( cssClass.muted );
                    volumeDefault = theAudio.volume;
                    theAudio.volume = 0;
                }
                return false;
            });

            volumeAdjuster.on( eStart, function( e )
            {
                adjustVolume( e );
                volumeAdjuster.on( eMove, function( e ) { adjustVolume( e ); } );
            })
            .on( eCancel, function()
            {
                volumeAdjuster.unbind( eMove );
            });
        }
        else thePlayer.addClass( cssClass.mini );

        thePlayer.addClass( isAutoPlay ? cssClass.playing : cssClass.stopped );

        thePlayer.find( '.' + cssClass.playPause ).on( 'click', function()
        {
            if( thePlayer.hasClass( cssClass.playing ) )
            {
                $( this ).attr( 'title', params.strPlay ).find( 'a' ).html( params.strPlay );
                thePlayer.removeClass( cssClass.playing ).addClass( cssClass.stopped );

                isSupport ? theAudio.pause() : theAudio.Stop();

            }
            else
            {
                var alist=document.querySelectorAll('audio');
                for(var i=0;i<alist.length;i++){
                    if(alist[i].parentNode.classList.contains(cssClass.playing)){
                        alist[i].parentNode.setAttribute('title',params.strPlay);
                        alist[i].parentNode.lastChild.firstChild.innerHTML=params.strPlay;
                        alist[i].parentNode.classList.remove(cssClass.playing );
                        alist[i].parentNode.classList.add(cssClass.stopped);
                        alist[i].load();
                        break;
                    }
                }
                $( this ).attr( 'title', params.strPause ).find( 'a' ).html( params.strPause );
                thePlayer.addClass( cssClass.playing ).removeClass( cssClass.stopped );

                isSupport ? theAudio.play() : theAudio.Play();

            }
            return false;
        });

        $this.replaceWith( thePlayer );
    });

return this;
};
})(jQuery, window, document);