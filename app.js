// Initialise the google map
//-----------------------------------------------------------------
function initMap() {
    
    return new google.maps.Map(document.getElementById('gmap'), {
        zoom: 15,
        center: { lat: 50.0839493, lng: 14.4239448 },
        scrollwheel: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
}

function initMarkers(map) {
    
    var markers = [];
    
    markers [0] = new google.maps.Marker({
        position: {lat: 50.079829, lng: 14.429658},
        animation: google.maps.Animation.DROP,
        title: 'Prague Architecture',
        map: map
    });
    
    markers [1] = new google.maps.Marker({
        position: {lat: 50.081450, lng: 14.412894},
        animation: google.maps.Animation.DROP,
        title: 'City of Music',
        map: map
    });
    
    markers [2] = new google.maps.Marker({
        position: {lat: 50.088876, lng: 14.409469},
        animation: google.maps.Animation.DROP,
        title: 'Secret Gardens',
        map: map
    });
    
    markers [3] = new google.maps.Marker({
        position: {lat: 50.089950, lng: 14.420906}, 
        animation: google.maps.Animation.DROP,
        title: 'Ghost and Legends',
        map: map
    });
    // return array of markers
    return markers; 
}
// initialise info windows

function initInfo(map,markers) {
    
    var html = [];
    
    html[0] = '<div class="infowin">' + 
        '<h2>Prague Architecture Walk</h2>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel lacus id nibh posuere ullamcorper at efficitur velit.</p>' +
        '</div>';
    html[1] = '<div class="infowin">' + 
        '<h2>City of Music Walk</h2>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel lacus id nibh posuere ullamcorper at efficitur velit.</p>' +
        '</div>';
    html[2] = '<div class="infowin">' + 
        '<h2>Secret Gardens Walk</h2>' +
        '<p>Porem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel lacus id nibh posuere ullamcorper at efficitur velit.</p>' +
        '</div>';
    html[3] = '<div class="infowin">' + 
        '<h2>Ghosts and Legends Walk</h2>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel lacus id nibh posuere ullamcorper at efficitur velit.</p>' +
        '</div>';
    
    var info = [];
    
    // loop while i < html array length, i increment by 1
    for(var i = 0; i < html.length; i++) {
        
        info[i] = addInfo(html[i], markers[i], map);
        
    }
    
    // -----------------------------------------------------
    function addInfo(html, marker, map){
        
        var iw = new google.maps.InfoWindow({
            content: html,
            maxWidth: 500
        });
        google.maps.event.addListener(marker, 'click', function() {
        
            // fixing on not being able to open infowin on first time
            // iw.close();
            // event func that will add a listener for an event, needs 3 arguements. 
            // when click occurs
            // if infowin is open or not
            if (isInfoOpen(iw)) {
                iw.close();
            } else {
                closeAllInfo(info);
                iw.open(map, this);       
            }
        });
        
        return iw;
        
        // -------------------------------------------------
        function isInfoOpen(infowin){
            var map =infowin.getMap();
            console.log(map);
            // return(map !== null && map !== 'undefined');
            // first time is undefined, 2nd time is null 
            if(map == null || map == 'undefined'){
                return false;
            }
            return true;
        }    
    }
    return info;
}

function closeAllInfo(info) {
    
    for(var i = 0; i < info.length; i++){
        info[i].close();    
    }
    
}


$(document).ready(function() {
	
	$('.smooth').smoothScroll({speed: 500});
	
    $('header').parallax();
	
	// navigation hiding
	var lastTop = 0;
	var offset = 5;
	
	$(window).scroll(function() {
		
		var top = $(this).scrollTop();
		
		if( Math.abs(lastTop - top) >= offset ) {
			
			if(top > lastTop) {
				$('nav').css('top', '-' + $('nav').height() + 'px');
			} else {
				$('nav').css('top', 0);
			}
			
		}
		
		lastTop = top;
		
	});
    
    // Guide image scale up
    $('.guide').each(function() {
         
        new Waypoint.Inview({
            element: $(this)[0], 
            entered: function(direction){
                $(this.element).addClass('scaleup');
            },
            exited: function(){
                $(this.element).removeClass('scaleup'); 
            }
        });

        
    });
    
    // Titles slide-in/fade-in
    $('.headline').each(function() {
        
        new Waypoint.Inview({
            element: $(this)[0],
            entered: function(direction) {
                $(this.element).addClass('animateh1');
            },
            exited: function(direction) {
                $(this.element).removeClass('animateh1');
            }
        });
        
    });
    
    var map = initMap();
    var markers = initMarkers(map);
    var info = initInfo(map, markers);
	
});