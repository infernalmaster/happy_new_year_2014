$(document).ready(function(){
            
    $.backgroundVideo($('.page1'), {
        "align": "centerXY",
        "width": 1280,
        "height": 720,
        "poster": 'assets/video/poster.jpg',
        "path": "assets/video/",
        "filename": "ny_2014",
        "types": ["mp4","webm", "ogg"]
    });    
    

    var slider = $(".main"),    
        navContainer = $('[data-nav]');
    
    navContainer.hide();
    
    slider.onepage_scroll({
        sectionContainer: "section",
        responsiveFallback: 800,
        pagination: false,
        loop: false,
        beforeMove: function(current, next) {
            if (next == 1){
                navContainer.hide();        
            } else {
                navContainer.show();
            }            
            navContainer.find('.active').removeClass('active');
            navContainer.find('[data-nav-slide="' + next + '"]').addClass('active');
        }
    });
        
    $(document).on ('click', '[data-nav-slide]', function(){ 
        var slide = $(this).data('nav-slide');                   
        slider.moveTo(slide);                  
    });

    
    
    //    audio controll
    var bgaudio = document.getElementById("bgaudio"),
        $audioPlay = $('[data-audio-play]'),
        $audioPause = $('[data-audio-pause]');
    
    $audioPlay.on ('click', function(){                   
        bgaudio.play();   
        $audioPlay.addClass('active');
        $audioPause.removeClass('active');
    });
    $audioPause.on ('click', function(){               
        bgaudio.pause();  
        $audioPlay.removeClass('active');
        $audioPause.addClass('active');
    });
    $audioPlay.trigger('click');
            
    
        
    //    video controll
    var bgvideo = document.getElementById("video_background"),
        $videoPlay = $('[data-video-play]'),
        $videoPause = $('[data-video-pause]');
        
    $videoPlay.on ('click', function(){                   
        bgvideo.play();    
        $videoPlay.addClass('active');
        $videoPause.removeClass('active');
    });
    $videoPause.on ('click', function(){               
        bgvideo.pause();  
        $videoPlay.removeClass('active');
        $videoPause.addClass('active');
    });
    $videoPlay.trigger('click');
       
    
    (function(){
        var picWrap = $('.long_pic-wrap'),
            pic = $('.long_pic'),
            pic_w,
            picWrap_w;
                
        $(window).resize(function(){
            pic.css('width', 'auto');
            pic_w = pic.height() * 3577 / 592,
            picWrap_w = picWrap.width();        
            pic.width(pic_w);
            pic.css('margin-left',  -(pic_w - picWrap_w)/2 + 'px' );        
        });    
        $(document).trigger('resize');
         
        
        pic.on('mousedown', mouseDown);
        pic.on('mouseup', mouseUp);
        pic.on('mouseleave', mouseUp);
                    
        function mouseUp(e){
            pic.off('mousemove');
        }
        
        var prevX;
        function mouseDown(e){    
            prevX = e.clientX;      
            pic.on('mousemove', divMove);
            e.preventDefault();
        }
        
        function divMove(e){            
            var ml = parseInt(pic.css('margin-left')),
                delta = e.clientX - prevX,        
                next_ml = ml + delta;
                                        
            if ((delta > 0 && next_ml < 0) || (delta < 0 && next_ml > picWrap_w - pic_w)){            
                pic.css('margin-left', next_ml  + 'px');        
                prevX = e.clientX;  
            } else if (delta < 0) {
                pic.css('margin-left', picWrap_w - pic_w  + 'px');    
            } else if (delta > 0) { 
                pic.css('margin-left', '0'); 
            }                            
        }
    })();

    
    
});