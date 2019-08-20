define("jquery.autocomplete",["jquery"],function(jQuery){

    (function ($) {
        var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');

        function fnFormatResult(value, currentValue) {
            var pattern = '(' + currentValue.replace(reEscape, '\\$1') + ')';
            return value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
        }

        $("#keyword-input").bind({
            focus: function () {
                if (this.value == "") {
                    $("#autoCompleteDivNew").remove();
                }
            }
        })
        function Autocomplete(el, options) {
            this.el = $(el);
            this.el.attr('autocomplete', 'off');
            this.suggestions = [];
            this.data = [];
            this.resultbox = [];
            this.badQueries = [];
            this.selectedIndex = -1;
            this.currentValue = this.el.val();
            this.intervalId = 0;
            this.cachedResponse = [];
            this.onChangeInterval = null;
            this.ignoreValueChange = false;
            this.serviceUrl = options.serviceUrl;
            this.degreeUrl = options.degreeUrl;
            this.isOuter = options.isOuter;
            this.isLocal = false;
            this.options = {
                autoSubmit: false,
                minChars: 1,
                maxHeight: 476,
                deferRequestBy: 0,
                width: 0,
                highlight: true,
                params: {},
                fnFormatResult: fnFormatResult,
                delimiter: null,
                zIndex: 9999
            };
            $.extend(this.options, options);
            this.initialize();
            this.setOptions(options);
        }

        $.fn.autocomplete = function (options) {
            return new Autocomplete(this.get(0) || $('<input />'), options);
        };
        Autocomplete.prototype = {
            killerFn: null, initialize: function () {
                var me, uid, autocompleteElId;
                me = this;
                uid = Math.floor(Math.random() * 0x100000).toString(16);
                autocompleteElId = 'Autocomplete_' + uid;
                var mainContainerBoxId = 'AutocompleteContainter_' + uid;
                this.killerFn = function (e) {
                    if ($(e.target).parents('.autocomplete').size() === 0) {
                        me.killSuggestions();
                        me.disableKillerFn();
                    }
                };
                if (!this.options.width) {
                    this.options.width = this.el.parent().width() - 2;
                } else {
                    this.options.width -= 2;
                }
                this.mainContainerId = 'AutocompleteContainter_' + uid;
                $('<div id="' + this.mainContainerId + '" style="position:absolute;z-index:9999999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + autocompleteElId + '" style="display:none;"></div></div></div>').appendTo('body');
                this.container = $('#' + autocompleteElId);
                this.fixPosition();
                if (window.opera) {
                    this.el.keypress(function (e) {
                        me.onKeyPress(e);
                    });
                } else {
                    this.el.keydown(function (e) {
                        me.onKeyPress(e);
                    });
                }
                this.el.keyup(function (e) {
                    me.onKeyUp(e);
                });
                this.el.blur(function () {
                    me.enableKillerFn();
                });
                this.el.focus(function () {
                    me.fixPosition();
                    if (($('#index1200').length > 0 && $('#index1200').hasClass('index1200')) || $('body').hasClass('index1200')) {
                    } else if (($('#index1200').length > 0 && $('#index1200').hasClass('index1000')) || $('body').hasClass('index1000')) {
                    }
                });
                this.changeTypeName();
                $(window).resize(function () {
                    if ($('#' + autocompleteElId).css("display") == 'block') {
                        clearTimeout(loadautocomResize);
                        var loadautocomResize = setTimeout(autocomResize, 200);
                    }
                })
                function autocomResize() {
                    var _left = $("#keyword-input").offset().left;
                    $('#' + mainContainerBoxId).css("left", _left);
                }
            }, setOptions: function (options) {
                var o = this.options;
                if (o.lookup) {
                    this.isLocal = true;
                    if ($.isArray(o.lookup)) {
                        o.lookup = {suggestions: o.lookup, data: []};
                    }
                }
                $('#' + this.mainContainerId).css({zIndex: o.zIndex});
                this.container.css({maxHeight: o.maxHeight + 'px'});
            }, clearCache: function () {
                this.cachedResponse = [];
                this.badQueries = [];
            }, disable: function () {
                this.disabled = true;
            }, enable: function () {
                this.disabled = false;
            }, fixPosition: function () {
                var $target = this.el.parent();
                var offset = $target.offset();
                $('#' + this.mainContainerId).css({
                    top: (offset.top + $target.innerHeight() - 1) + 'px',
                    left: offset.left + 'px'
                });
            }, enableKillerFn: function () {
                var me = this;
                $(document).bind('click', me.killerFn);
            }, disableKillerFn: function () {
                var me = this;
                $(document).unbind('click', me.killerFn);
            }, killSuggestions: function () {
                var me = this;
                var sbanner = $('.searchbanner');
                this.stopKillSuggestions();
                this.intervalId = window.setInterval(function () {
                    me.hide();
                    if (sbanner.length > 0)sbanner.remove();
                    me.stopKillSuggestions();
                }, 300);
            }, stopKillSuggestions: function () {
                window.clearInterval(this.intervalId);
            }, onKeyPress: function (e) {
                var sbanner = $('.searchbanner');
                if (this.disabled || !this.enabled) {
                    return;
                }
                switch (e.keyCode) {
                    case 27:
                        this.el.val(this.currentValue);
                        this.hide();
                        if (sbanner.length > 0)sbanner.remove();
                        break;
                    case 9:
                    case 13:
                        if (this.selectedIndex === -1) {
                            this.hide();
                            if (sbanner.length > 0)sbanner.remove();
                            return;
                        }
                        if (e.keyCode === 9) {
                            return;
                        }
                        break;
                    case 38:
                        this.moveUp();
                        break;
                    case 40:
                        this.moveDown();
                        break;
                    default:
                        return;
                }
                e.stopImmediatePropagation();
                e.preventDefault();
            }, onKeyUp: function (e) {
                if (this.disabled) {
                    return;
                }
                switch (e.keyCode) {
                    case 38:
                    case 40:
                        return;
                }
                clearInterval(this.onChangeInterval);
                if (this.currentValue !== this.el.val()) {
                    if (this.options.deferRequestBy > 0) {
                        var me = this;
                        this.onChangeInterval = setInterval(function () {
                            me.onValueChange();
                        }, this.options.deferRequestBy);
                    } else {
                        this.onValueChange();
                    }
                }
            }, onValueChange: function () {
                clearInterval(this.onChangeInterval);
                this.currentValue = this.el.val().replace(/\'*/ig, '');
                var q = this.getQuery(this.currentValue);
                this.selectedIndex = -1;
                if (this.ignoreValueChange) {
                    this.ignoreValueChange = false;
                    return;
                }
                $('.searchbanner').remove();
                if (q === '' || q.length < this.options.minChars) {
                    this.hide();
                } else {
                    this.getSuggestions(q);
                }
            }, getQuery: function (val) {
                var d, arr;
                d = this.options.delimiter;
                if (!d) {
                    return $.trim(val);
                }
                arr = val.split(d);
                return $.trim(arr[arr.length - 1]);
            }, getSuggestionsLocal: function (q) {
                var ret, arr, len, val, i;
                arr = this.options.lookup;
                len = arr.suggestions.length;
                ret = {suggestions: [], data: []};
                q = q.toLowerCase();
                for (i = 0; i < len; i++) {
                    val = arr.suggestions[i];
                    if (val.toLowerCase().indexOf(q) === 0) {
                        ret.suggestions.push(val);
                        ret.data.push(arr.data[i]);
                    }
                }
                return ret;
            }, getSuggestions: function (q) {
                var cr, me;
                cr = this.isLocal ? this.getSuggestionsLocal(q) : this.cachedResponse[q];
                if (cr && $.isArray(cr.suggestions)) {
                    this.suggestions = cr.suggestions;
                    this.data = cr.data;
                    this.suggest();
                } else if (!this.isBadQuery(q)) {
                    me = this;
                    me.options.params.query = q;
                    var t = this.isAllProduct();
                    me.options.params.type = t;
                    if (this.isOuter) {
                        var url = this.serviceUrl + "&query=" + encodeURI(q) + "&t=" + t + "&format=json&jsoncallback=?";
                        $.getJSON(url, function (json) {
                            me.processResponse(json);
                        });
                    } else {
                        $.get(this.serviceUrl, me.options.params, function (txt) {
                            me.processResponse(txt);
                        }, 'text');
                    }
                }
            }, isBadQuery: function (q) {
                var i = this.badQueries.length;
                while (i--) {
                    if (q.indexOf(this.badQueries[i]) === 0) {
                        return true;
                    }
                }
                return false;
            }, hide: function () {
                this.enabled = false;
                this.selectedIndex = -1;
                this.container.hide();
            }, suggest: function () {
                if (this.suggestions.length === 0) {
                    this.hide();
                    return;
                }
                var me, len, div, f, v, i, s, mOver, mClick;
                me = this;
                len = this.suggestions.length;
                f = this.options.fnFormatResult;
                v = this.getQuery(this.currentValue);
                mOver = function (xi) {
                    return function () {
                        me.activate(xi);
                    };
                };
                mClick = function (xi) {
                    return function () {
                    }
                };
                this.container.hide().empty();
                var prod_type = this.isAllProduct();
                var locationDiv = "", allPDiv = "", allproItemDiv = "", recommendDiv = "", freeFlyDiv = "", ticketDiv = "", wifiDiv = "", visaDiv = "", hotelDiv = "", trainDiv = "", flightDiv = "", hotCountryDiv = "", hotCityDiv = "", hotScenicDiv = "", nearScenicDiv = "", sameNameScenicDiv = "", playDiv = "", suggFroRbzDiv="";
                var mai = this.suggestions, pro = mai.allProducts, rec = mai.recommend, diy = mai.freeFly, tic = mai.ticket, wi = mai.wifi, vi = mai.visa, hotel = mai.hotel, tra = mai.train, fli = mai.flight, hc = mai.hotCountry, hCity = mai.hotCity, hs = mai.hotScenic, ns = mai.nearScenic, sn = mai.sameNameScenic, play=mai.destPlay,suggFroRbz=mai.suggestFromRbz;
                var alldiv = "";
                if (suggFroRbz && suggFroRbz != "" && suggFroRbz.length > 0) {
                    for (var j = 0; j < suggFroRbz.length; j++) {
                        var list = suggFroRbz[j];
                        suggFroRbzDiv += '<div class="resultbox an_mo" title="' + list.suggestWord + '"><a href="' + list.url + '" target="_self"><span class="autocomplete-icon auto-icon-all"></span><div class="left1">' + list.suggestWord + '</div></a></div>';
                        alldiv = suggFroRbzDiv;
                    }
                } else {
                    if (mai && mai != "" && mai.keyWord) {
                        var _parentName = mai.parentName;
                        if (_parentName == null) {
                            _parentName = "";
                        }
                        locationDiv = '<div class="resultbox an_mo" title="' + mai.keyWord + '" data-id="' + mai.keyId + '">'
                            + '<a href="' + mai.keyUrl + '" target="_self">'
                            + '<span class="autocomplete-icon auto-icon-location"></span>'
                            + '<div class="left1 autocomplete-input-value"><strong>' + mai.keyWord + '</strong></div>'
                            + '<div class="location location_first">' + _parentName + '</div>'
                            + '</a></div>'
                    }
                    if (pro && pro != "") {
                        if (pro.count > 0) {
                            allPDiv = '<div class="resultbox an_mo" title="' + mai.keyWord + '" data-id="' + mai.keyId + '">'
                                + '<a href="' + pro.keyUrl + '" target="_self">'
                                + '<span class="autocomplete-icon auto-icon-all"></span>'
                                + '<div class="left1"><strong>' + mai.keyWord + '</strong>的全部旅游产品'
                                + '</div>'
                                + '<div class="right">' + '约' + pro.count + '个结果' + '</div>'
                                + '</a></div>'
                        }
                        if (pro.allType && pro.allType.length > 0) {
                            for (var j = 0; j < pro.allType.length; j++) {
                                var ss = pro.allType[j];
                                allproItemDiv += '<div class="resultbox an_mo"' + ' title="' + ss.keyWord + '"  data-id="' + ss.keyId + '"><a href="' + ss.keyUrl + '" target="_self"><div class="left2"> 查看</div><div class="left3"><strong>' + ss.keyWord + '</strong></div><div class="left4">' + ss.productType + '</div><div class="right">' + '约' + ss.productCount + '个结果' + '</div></a></div>';
                            }
                            allPDiv += allproItemDiv;
                        }
                    }
                    if (rec && rec != "") {
                        recommendDiv = '<div class="resultbox an_mo" title="' + rec.keyWord + '" data-id="' + mai.keyId + '">'
                            + '<a href="' + rec.keyUrl + '" target="_self">'
                            + '<span class="autocomplete-icon auto-icon-recommend"></span>'
                            + '<div class="left1">' + f(rec.keyWord, mai.keyWord) + '</div>'
                            + '</a></div>'
                        if (rec.productList && rec.productList.length > 0) {
                            var recItemDiv = "";
                            for (var r = 0; r < rec.productList.length; r++) {
                                var rr = rec.productList[r];
                                recItemDiv += '<div class="resultbox an_mo"' + ' title="' + rr.productName + '" data-id="' + rr.keyId + '"><a href="' + rr.keyUrl + '" target="_self"><div class="left5">' + f(rr.productName, mai.keyWord) + '</div><div class="right"><span class="price">¥' + rr.price + '</span>' + '起</div></a></div>';
                            }
                            recommendDiv += recItemDiv;
                        }
                    }
                    if (diy && diy != "") {
                        freeFlyDiv = '<div class="resultbox an_mo" title="' + diy.keyWord + '" data-id="' + diy.keyId + '">'
                            + '<a href="' + diy.keyUrl + '" target="_blank">'
                            + '<span class="autocomplete-icon auto-icon-diy"></span>'
                            + '<div class="left1">' + f(diy.keyWord, mai.keyWord) + '</div>'
                            + '<div class="right">' + '约' + diy.productCount + '个结果' + '</div></a></div>'
                    }
                    if (play && play.productCount && play.productCount > 1) {
                        playDiv = '<div class="resultbox an_mo" title="' + play.keyWord + '" data-id="' + play.keyId + '">'
                            + '<a href="' + play.keyUrl + '" target="_blank">'
                            + '<span class="autocomplete-icon auto-icon-play"></span>'
                            + '<div class="left1">' + f(play.keyWord, mai.keyWord) + '</div>'
                            + '<div class="right">' + '约' + play.productCount + '个结果' + '</div></a></div>';
                    }
                    if (wi && wi != "") {
                        var wifiNum = "";
                        if (wi.count && wi.count != "") {
                            wifiNum = '<div class="right">' + '约' + wi.count + '个结果' + '</div>';
                        }
                        if (mai.keyPoiType >= 9) {
                            var wi_key = wi.keyWord;
                        }
                        else {
                            wi_key = '<strong>' + wi.keyWord + '</strong>';
                        }
                        wifiDiv = '<div class="resultbox an_mo" title="' + wi.keyWord + '" data-id="' + wi.keyId + '">' + '<a href="' + wi.keyUrl + '" target="_self">' + '<span class="autocomplete-icon auto-icon-wifi"></span><div class="left1">' + wi_key + 'WIFI</div>' + wifiNum + '</a></div>'
                    }
                    if (vi && vi != "") {
                        var visaNum = "";
                        if (vi.count && vi.count != "") {
                            visaNum = '<div class="right">' + '约' + vi.count + '个结果' + '</div>';
                        }
                        if (mai.keyPoiType >= 9) {
                            var vi_key = vi.keyWord;
                        }
                        else {
                            vi_key = '<strong>' + vi.keyWord + '</strong>';
                        }
                        visaDiv = '<div class="resultbox an_mo" title="' + vi.keyWord + '" data-id="' + vi.keyId + '">' + '<a href="' + vi.keyUrl + '" target="_self">' + '<span class="autocomplete-icon auto-icon-visa"></span><div class="left1">' + vi_key + '签证</div>' + visaNum + '</a></div>'
                    }
                    if (fli && fli != "") {
                        flightDiv = '<div class="resultbox an_mo" title="' + fli.keyWord + '" data-id="' + mai.keyId + '">'
                            + '<a href="' + fli.keyUrl + '" target="_blank">'
                            + '<span class="autocomplete-icon auto-icon-plane"></span>'
                            + '<div class="left1">' + f(fli.beginCity, mai.keyWord) + '到' + f(fli.destCity, mai.keyWord) + '的机票</div>'
                            + '</a></div>'
                    }
                    if (tra && tra != "") {
                        trainDiv = '<div class="resultbox an_mo" title="' + tra.keyWord + '" data-id="' + mai.keyId + '">'
                            + '<a href="' + tra.keyUrl + '" target="_blank">'
                            + '<span class="autocomplete-icon auto-icon-train"></span>'
                            + '<div class="left1">' + f(tra.beginCity, mai.keyWord) + '到' + f(tra.destCity, mai.keyWord) + '的火车票</div>'
                            + '</a></div>'
                    }
                    if (tic && tic != "") {
                        var _right = "";
                        if (tic.productCount && tic.productCount != "" && tic.productCount >= "1") {
                            var _right = '约' + tic.productCount + '个结果';
                            ticketDiv = '<div class="resultbox an_mo" title="' + tic.keyWord + '" data-id="' + tic.keyId + '">'
                                + '<a href="' + tic.keyUrl + '" target="_self">'
                                + '<span class="autocomplete-icon auto-icon-ticket"></span>'
                                + '<div class="left1"><strong>' + tic.keyWord + '</strong>的全部门票</div>'
                                + '<div class="right">' + _right + '</div></a></div>'
                            if (tic.ticketInfo && tic.ticketInfo.length > 0) {
                                var ticItemDiv = "";
                                for (var t = 0; t < tic.ticketInfo.length; t++) {
                                    var tt = tic.ticketInfo[t];
                                    ticItemDiv += '<div class="resultbox an_mo"' + ' title="'
                                        + tt.keyWord + '" data-id="' + tt.keyId + '"><a href="' + tt.keyUrl + '" target="_self"><div class="left5">'
                                        + f(tt.keyWord, mai.keyWord) + '</div><div class="right"><span class="price">¥'
                                        + tt.price + '</span>'
                                        + '起</div></a></div>';
                                }
                                ticketDiv += ticItemDiv;
                            }
                        }
                        else {
                            ticketDiv = "";
                        }
                    }
                    if (hotel && hotel != "") {
                        hotelDiv = '<div class="resultbox an_mo" title="' + hotel.keyWord + '" data-id="' + mai.keyId + '">'
                            + '<a href="' + hotel.keyUrl + '" target="_blank">'
                            + '<span class="autocomplete-icon auto-icon-hotel"></span>'
                            + '<div class="left1"><strong>' + hotel.keyWord + '</strong>的全部酒店</div>'
                            + '<div class="right">' + '约' + hotel.productCount + '个结果' + '</div></a></div>'
                        if (hotel.hotelInfo && hotel.hotelInfo.length > 0) {
                            var hotelItemDiv = "";
                            for (var h = 0; h < hotel.hotelInfo.length; h++) {
                                var hh = hotel.hotelInfo[h];
                                var _rightItem = "";
                                if (hh.keyName && hh.keyName != null && hh.keyName != "") {
                                    if (hh.price && hh.price != null && hh.price >= 1) {
                                        _rightItem = '<div class="right"><span class="price">¥' + hh.price + '</span>起</div>';
                                    }
                                    hotelItemDiv += '<div class="resultbox an_mo"' + ' title="' + hh.keyName + '" data-id="' + hh.keyId + '"><a href="' + hh.keyUrl + '" target="_blank"><div class="left5">' + f(hh.keyName, mai.keyWord) + '</div>' + _rightItem + '</a></div>';
                                    if (h == 1) {
                                        break;
                                    }
                                }
                                else {
                                    hotelItemDiv = "";
                                }
                            }
                            hotelDiv += hotelItemDiv;
                        }
                    }
                    if (hc && hc.length > 0) {
                        for (var ha = 0; ha < hc.length; ha++) {
                            var haa = hc[ha];
                            hotCountryDiv += '<div class="resultbox an_mo" title="' + haa.keyWord + '" data-id="' + haa.keyId + '">'
                                + '<a href="' + haa.keyUrl + '" target="_self">'
                                + '<span class="autocomplete-icon auto-icon-jingdian"></span>'
                                + '<div class="left1">' + f(haa.keyWord, mai.keyWord) + '</div>'
                                + '<div class="location">' + haa.parentName + '</div>'
                                + '<div class="right">' + '约' + haa.productCount + '个结果' + '</div></a></div>';
                        }
                    }
                    if (hCity && hCity.length > 0) {
                        for (var hb = 0; hb < hCity.length; hb++) {
                            var hbb = hCity[hb];
                            hotCityDiv += '<div class="resultbox an_mo" title="' + hbb.keyWord + '" data-id="' + hbb.keyId + '">'
                                + '<a href="' + hbb.keyUrl + '" target="_self">'
                                + '<span class="autocomplete-icon auto-icon-jingdian"></span>'
                                + '<div class="left1">' + f(hbb.keyWord, mai.keyWord) + '</div>'
                                + '<div class="location">' + hbb.parentName + '</div>'
                                + '<div class="right">' + '约' + hbb.productCount + '个结果' + '</div></a></div>';
                        }
                    }
                    if (hs && hs.length > 0) {
                        for (var hc = 0; hc < hs.length; hc++) {
                            var hcc = hs[hc];
                            hotScenicDiv += '<div class="resultbox an_mo" title="' + hcc.keyWord + '" data-id="' + hcc.keyId + '">'
                                + '<a href="' + hcc.keyUrl + '" target="_self">'
                                + '<span class="autocomplete-icon auto-icon-jingdian"></span>'
                                + '<div class="left1">' + f(hcc.keyWord, mai.keyWord) + '</div>'
                                + '<div class="location">' + hcc.parentName + '</div>'
                                + '<div class="right">' + '约' + hcc.productCount + '个结果' + '</div></a></div>';
                        }
                    }
                    if (ns && ns.length > 0) {
                        for (var hd = 0; hd < ns.length; hd++) {
                            var hdd = ns[hd];
                            nearScenicDiv += '<div class="resultbox an_mo" title="' + hdd.keyWord + '" data-id="' + hdd.keyId + '">'
                                + '<a href="' + hdd.keyUrl + '" target="_self">'
                                + '<span class="autocomplete-icon auto-icon-jingdian"></span>'
                                + '<div class="left1">' + f(hdd.keyWord, mai.keyWord) + '</div>'
                                + '<div class="location">' + hdd.parentName + '</div>'
                                + '<div class="right">距离' + mai.keyWord + hdd.distance + '</div></a></div>';
                        }
                    }
                    if (sn && sn.length > 0) {
                        for (var he = 0; he < sn.length; he++) {
                            var hee = sn[he];
                            sameNameScenicDiv += '<div class="resultbox an_mo" title="' + hee.keyWord + '" data-id="' + hee.keyId + '">'
                                + '<a href="' + hee.keyUrl + '" target="_self">'
                                + '<span class="autocomplete-icon auto-icon-jingdian"></span>'
                                + '<div class="left1">' + f(hee.keyWord, mai.keyWord) + '</div>'
                                + '<div class="location">' + hee.parentName + '</div>'
                                + '</a></div>';
                        }
                    }
                    if (mai.keyPoiType >= 9) {
                        alldiv = locationDiv + allPDiv + recommendDiv + ticketDiv + hotelDiv + flightDiv + trainDiv + wifiDiv + visaDiv + freeFlyDiv + playDiv + hotCountryDiv + hotCityDiv + hotScenicDiv + nearScenicDiv + sameNameScenicDiv;
                    }
                    else {
                        alldiv = locationDiv + allPDiv + recommendDiv + wifiDiv + visaDiv + flightDiv + trainDiv + ticketDiv + hotelDiv + freeFlyDiv + playDiv + hotCountryDiv + hotCityDiv + hotScenicDiv + nearScenicDiv + sameNameScenicDiv;
                    }
                }
                if(alldiv === ""){
                    this.container.html(alldiv).css("display","none");
                }
                else{
                    this.container.html(alldiv).css("display","block");
                }

                var _val = $("#keyword-input").val();
                this.container.find(".resultbox").each(function (i, n) {
                    $(n).mouseover(mOver(i));
                    $(n).click(mClick(i));
                    var _key = $(n).find(".left1").text() || $(n).find(".left3").text() + $(n).find(".left4").text();
                    if (_key == "") {
                        _key = $(n).attr("title");
                    }
                    var _liwi = '搜索联想词-' + _val + '-' + (i + 1) + '-' + _key;
                    $(n).attr("liwithhan", _liwi);
                })
                this.enabled = true;

            }, processResponse: function (text) {
                var response;
                if (this.isOuter) {
                    response = text;
                } else {
                    try {
                        response = eval('(' + text + ')');
                    } catch (err) {
                        return;
                    }
                }
                if (!$.isArray(response.data)) {
                    response.data = [];
                }
                if (!this.options.noCache) {
                    this.cachedResponse[response.query] = response;
                    if (response.suggestions.length === 0) {
                        this.badQueries.push(response.query);
                    }
                }
                if (response.query === this.getQuery(this.currentValue)) {
                    this.suggestions = response.suggestions;
                    this.data = response.data;
                    this.suggest();
                }
            }, activate: function (index) {
                var divs, activeItem, dataId;
                divs = this.container.children();
                if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
                    $(divs.get(this.selectedIndex)).removeClass("selected");
                    dataId = {
                        dataId: $(activeItem).attr('data-id'),
                        key_word: $(activeItem).attr('title'),
                        degreeUrl: this.degreeUrl
                    }
                    $(activeItem).trigger('getDegree', dataId);
                }
                this.selectedIndex = index;
                if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
                    activeItem = divs.get(this.selectedIndex);
                    $(activeItem).addClass('selected');
                    dataId = {
                        dataId: $(activeItem).attr('data-id'),
                        key_word: $(activeItem).attr('title'),
                        degreeUrl: this.degreeUrl
                    }
                    $(activeItem).trigger('getDegree', dataId);
                }
                return activeItem;
            }, deactivate: function (div, index) {
                div.className = 'resultbox';
                if (this.selectedIndex === index) {
                    this.selectedIndex = -1;
                }
            }, select: function (i) {
                var selectedValue, f;
                var _current = $(".resultbox.selected");
                if (_current.find(".left1").length > 0) {
                    selectedValue = $(".resultbox.selected .left1").text();
                }
                else if (_current.find(".left3").length > 0) {
                    selectedValue = $(".resultbox.selected .left3").text() + $(".resultbox.selected .left4").text();
                }
                else {
                    selectedValue = _current.attr("title");
                }
                if (selectedValue) {
                    this.el.val(selectedValue);
                    if (this.options.autoSubmit) {
                        f = this.el.parents('form');
                        if (f.length > 0) {
                            f.get(0).submit();
                        }
                    }
                    this.ignoreValueChange = true;
                    this.hide();
                    this.onSelect(i);
                }
            }, moveUp: function () {
                if (this.selectedIndex === -1) {
                    return;
                }
                if (this.selectedIndex === 0) {
                    this.container.children().get(0).className = 'resultbox';
                    this.selectedIndex = -1;
                    this.el.val(this.currentValue);
                    return;
                }
                this.adjustScroll(this.selectedIndex - 1);
            }, moveDown: function () {
                if (this.selectedIndex === (this.container.children(".resultbox").length - 1)) {
                    return;
                }
                this.adjustScroll(this.selectedIndex + 1);
            }, adjustScroll: function (i) {
                var activeItem, offsetTop, upperBound, lowerBound;
                activeItem = this.activate(i);
                offsetTop = activeItem.offsetTop;
                upperBound = this.container.scrollTop();
                lowerBound = upperBound + this.options.maxHeight - 25;
                if (offsetTop < upperBound) {
                    this.container.scrollTop(offsetTop);
                } else if (offsetTop > lowerBound) {
                    this.container.scrollTop(offsetTop - this.options.maxHeight + 25);
                }
                var _current = $(".resultbox.selected");
                if (_current.find(".left1").length > 0) {
                    this.el.val(this.getValue($(".resultbox.selected .left1").text()));
                }
                else if (_current.find(".left3").length > 0) {
                    this.el.val(this.getValue($(".resultbox.selected .left3").text() + $(".resultbox.selected .left4").text()));
                }
                else {
                    this.el.val(this.getValue(_current.attr("title")));
                }
            }, onSelect: function (i) {
                var me, fn, s, d;
                var _current = $(".resultbox.selected");
                me = this;
                fn = me.options.onSelect;
                s = _current.attr("title");
                d = _current.attr("title");
                me.el.val(me.getValue(s));
                if ($.isFunction(fn)) {
                    fn(i);
                }
            }, getValue: function (value) {
                var del, currVal, arr, me;
                me = this;
                del = me.options.delimiter;
                if (!del) {
                    return value;
                }
                currVal = me.currentValue;
                arr = currVal.split(del);
                if (arr.length === 1) {
                    return value;
                }
                return currVal.substr(0, currVal.length - arr[arr.length - 1].length) + value;
            }, isAllProduct: function () {
                var typename = this.el.attr("data");
                return typename;
            }, changeTypeName: function () {
                var me = this;
                $("#typename").mouseover(function () {
                    $(".tn_search_bar").css("display", "block");
                    $("#spic").css("background", "url(http://img1.tuniucdn.com/site/images/index/up.jpg) center right no-repeat");
                    $("#searchInputBox").hide();
                });
                $("#typename").mouseout(function () {
                    $(".tn_search_bar").css("display", "none");
                    $("#spic").css("background", "url(http://img1.tuniucdn.com/site/images/index/down.jpg) center right no-repeat");
                })
                $("#typename").find(".type_s").click(function () {
                    me.clearCache();
                    $(this).siblings().show();
                    var temp = $(this).index();
                    var s = $(this).text();
                    var t = $("#typename span").text();
                    var keyword = $("#keyword-input");
                    $("#typename span").text(s);
                    if ($.trim(s) == "所有产品") {
                        keyword.attr("data", "");
                        keyword.attr("data-cla", "");
                    } else if ($.trim(s) == "跟团游") {
                        keyword.attr("data", 1);
                    } else if ($.trim(s) == "自助游") {
                        keyword.attr("data", 2);
                    } else if ($.trim(s) == "酒店") {
                        keyword.attr("data", 3);
                    } else if ($.trim(s) == "机票") {
                        keyword.attr("data", 4);
                    } else if ($.trim(s) == "团队游") {
                        keyword.attr("data", 5);
                    } else if ($.trim(s) == "景点门票") {
                        keyword.attr("data", 6);
                    } else if ($.trim(s) == "保险") {
                        keyword.attr("data", 7);
                    } else if ($.trim(s) == "自驾游") {
                        keyword.attr("data", 8);
                    } else if ($.trim(s) == "签证") {
                        keyword.attr("data", 9);
                    } else if ($.trim(s) == "邮轮") {
                        keyword.attr("data", 10);
                    } else if ($.trim(s) == "火车票") {
                        keyword.attr("data", 11);
                    } else if ($.trim(s) == "当地参团") {
                        keyword.attr("data", 13);
                    } else if ($.trim(s) == "当地玩乐") {
                        keyword.attr("data", 17);
                    }
                    $("#typename .tn_search_bar").hide();
                    $(this).hide();
                });
            }
        };
    }(jQuery));
})
