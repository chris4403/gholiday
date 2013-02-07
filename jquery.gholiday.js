(function($){
    var data = {
        "us": ["United States", "usa__en"],
        "ja": ["Japan", "japanese__ja"],
        "au": ["Australia", "australian__en"],
        "at": ["Austria", "austrian__en"],
        "br": ["Brazil", "brazilian__en"],
        "ca": ["Canada", "canadian__en"],
        "cn": ["China", "china__en"],
        "dk": ["Denmark", "danish__en"],
        "nl": ["Netherlands", "dutch__en"],
        "fi": ["Finland", "finnish__en"],
        "fr": ["France", "french__en"],
        "de": ["Germany", "german__en"],
        "gr": ["Greece", "greek__en"],
        "hk": ["Hong Kong", "hong_kong__en"],
        "in": ["India", "indian__en"],
        "id": ["Indonesia", "indonesian__en"],
        "ie": ["Ireland", "irish__en"],
        "it": ["Italy", "italian__en"],
        "my": ["Malaysia", "malaysia__en"],
        "mx": ["Mexico", "mexican__en"],
        "nz": ["New Zealand", "new_zealand__en"],
        "no": ["Norway", "norwegian__en"],
        "ph": ["Philippines", "philippines__en"],
        "pl": ["Poland", "polish__en"],
        "pt": ["Portugal", "portuguese__en"],
        "ru": ["Russian Federation", "russian__en"],
        "sg": ["Singapore", "singapore__en"],
        "za": ["South Africa", "sa__en"],
        "kr": ["South Korea", "south_korea__en"],
        "es": ["Spain", "spain__en"],
        "se": ["Sweden", "swedish__e"],
        "tw": ["Taiwan", "taiwan__en"],
        "th": ["Thailand", "thai__en"],
        "gb": ["United Kingdom", "uk__en"],
        "vn": ["Viet Nam", "vietnamese__en"]
    }
    $.getGHoliday = function(options){
        options = (options) ? options : {};
        if (!options || !options["callback"]) return;
        var country = (options && options["country"]) ? options.country : "us";
        var account = data[country][1];
        var url = 'http://www.google.com/calendar/feeds/' + account + '@holiday.calendar.google.com/public/full-noattendees';
        var fmtDate = function(p){
            var p = new Date(p);
            p = (p) ? p : new Date();
            var padZero = function(_in){
                _in = "" + _in;
                if (_in.length == 1)
                    return '0' + _in;
                else
                    return _in;
            }
            if (p.getTime)
                return p.getFullYear() + '-' + padZero(p.getMonth() + 1) + '-' + padZero(p.getDate());
        };
        var start = (options["start"]) ? options.start : new Date();
        var end = (options["end"]) ? options.end : new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);
        var param = {
            "start-min": fmtDate(start),
            "start-max": fmtDate(end),
            "max-results": "100",
            "alt": "json",
        };
        $.ajax(url,{
            dataType : "json",
            method : "GET",
            data : param
        }).done(function(data) {
            var holidays = data.feed.entry;
            var val = [];
            for (var i = 0, len = holidays.length; i < len; i++) {
                var h = holidays[i];
                val.push({
                    "date": h.gd$when[0].startTime,
                    "title": h.title.$t
                });
            }
            options.callback(val);
        });
   }

})(jQuery);
