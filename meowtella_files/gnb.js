var getRandomInit = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
function getRamdomIndex(arr, value) {
  var index = arr.indexOf(value);
  if (index === -1) {
    return getRamdomIndex(arr, value + 1);
  } else {
    return index;
  }
}

var setLink = function (data) {
  if (data.bg_color) {
    $(".image-banner").css("background-color", data.bg_color);
  }
  if (data.text_color) {
    $(".image-banner__close").css("color", data.text_color);
    var closeBtn = $(
      '<svg class="image-banner__close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="' +
        data.text_color +
        '" d="M18.545 4L20 5.455 13.454 12 20 18.545 18.545 20 12 13.454 5.455 20 4 18.545 10.545 12 4 5.455 5.455 4 12 10.545 18.545 4z"/></svg>'
    );

    $(".image-banner__close").append(closeBtn);
  }

  $(".image-banner__close").css("color");
  var $imageBanner = $(".image-banner__img");
  var $link = $(
    '<a class="image-banner__link" href="' +
      data.link +
      '" target="_blank"><img class="image-banner__icon" src="' +
      data.image_url +
      '" /></a>'
  );

  $imageBanner.append($link);
};

var setImageBanner = function (data) {
  if (data) {
    var header = $("header");
    var lang = header.data("lang");
    if(lang.indexOf('zh') == -1) {
      lang = header.data("lang").split("_")[0];
    }
    var region = header.data("region").toLowerCase();
    var isMobile = header.data("ismobile");
    var closeType = "SESSION";

    if (!isMobile) {
      var closeImgBanner = $.cookie("closeImgBanner");
      if (closeImgBanner !== "true") {
        $(".image-banner").addClass("image-banner--show");
      }

      if (data && data[lang]) {
        // close type 지정
        if (data[lang].close_type) {
          closeType = data[lang].close_type;
        }

        if (data[lang].region) {
          if (data[lang].region === region) {
            var bannerArray = data[lang].banner;
            if (bannerArray.length > 1) {
              var weightArray = [];
              var totalWeight = 0;
              bannerArray.forEach(function (value, index) {
                if (index) {
                  weightArray.push(weightArray[index - 1] + value.weight);
                } else {
                  weightArray.push(value.weight);
                }
                totalWeight += value.weight;
              });
              var randomNum = getRandomInit(1, totalWeight + 1);
              var ramdomIndex = getRamdomIndex(weightArray, randomNum);

              setLink(bannerArray[ramdomIndex]);
            } else {
              setLink(bannerArray[0]);
            }
          } else {
            $(".image-banner").removeClass("image-banner--show");
          }
        } else {
          var bannerArray = data[lang].banner;
          if (bannerArray.length > 1) {
            var weightArray = [];
            var totalWeight = 0;
            bannerArray.forEach(function (value, index) {
              if (index) {
                weightArray.push(weightArray[index - 1] + value.weight);
              } else {
                weightArray.push(value.weight);
              }
              totalWeight += value.weight;
            });
            var randomNum = getRandomInit(1, totalWeight + 1);
            var ramdomIndex = getRamdomIndex(weightArray, randomNum);

            setLink(bannerArray[ramdomIndex]);
          } else {
            setLink(bannerArray[0]);
          }
        }
      } else if (data.default) {
        var bannerArray = data.default.banner;
        if (bannerArray.length > 1) {
          var weightArray = [];
          var totalWeight = 0;
          bannerArray.forEach(function (value, index) {
            if (index) {
              weightArray.push(weightArray[index - 1] + value.weight);
            } else {
              weightArray.push(value.weight);
            }
            totalWeight += value.weight;
          });
          var randomNum = getRandomInit(1, totalWeight + 1);
          var ramdomIndex = getRamdomIndex(weightArray, randomNum);

          setLink(bannerArray[ramdomIndex]);
        } else {
          setLink(bannerArray[0]);
        }
      } else {
        $(".image-banner").removeClass("image-banner--show");
      }
    }

    $(function () {
      var imageBannerClose = $(".image-banner__close");

      imageBannerClose.on("click", function () {
        if (closeType === "SESSION") $.cookie("closeImgBanner", "true");
        // session based cookie??
        else if (closeType === "DAY")
          $.cookie("closeImgBanner", "true", { expires: 1 });

        $(".image-banner").removeClass("image-banner--show");
      });
    });
  }
};

var setTextLink = function (data, isMobile) {
  var $menu = $(".l-menu");
  var $mMenu = $(".index__menu");
  var $mMenu2 = $(".layout__menu");
  var alert = $(
    '<div class="alert"><div class="alert__item "><a href="' +
      data.link +
      '" onclick="" target="_blank" >' +
      data.title +
      "</a></div></div>"
  );
  var mAlert = $(
    '<div class="header__notification"><div class="notification notification--alert"><div class="notification__info notification__info--" style=""><a href="' +
      data.link +
      '" onclick="" target="_blank">' +
      data.title +
      "</a></div></div></div>"
  );
  if (isMobile) {
    if ($menu.length) {
      $mMenu.after(mAlert);
    } else {
      $mMenu2.after(mAlert);
    }
  } else {
    $menu.after(alert);
  }
};

var setTextBanner = function (data) {
  var header = $("header");
  lang = header.data("lang");
  if(lang.indexOf('zh') == -1) {
    lang = header.data("lang").split("_")[0];
  }
  region = header.data("region").toLowerCase();
  var isMobile = header.data("ismobile");

  if (!data) return;

  if (data && data[lang]) {
    if (data[lang].region) {
      if (data[lang].region === region) {
        var bannerArray = data[lang].banner;
        if (bannerArray.length > 1) {
          var weightArray = [];
          var totalWeight = 0;
          bannerArray.forEach(function (value, index) {
            if (index) {
              weightArray.push(weightArray[index - 1] + value.weight);
            } else {
              weightArray.push(value.weight);
            }
            totalWeight += value.weight;
          });
          var randomNum = getRandomInit(1, totalWeight + 1);
          var ramdomIndex = getRamdomIndex(weightArray, randomNum);

          setTextLink(bannerArray[ramdomIndex], isMobile);
        } else {
          setTextLink(bannerArray[0], isMobile);
        }
      }
    } else {
      var bannerArray = data[lang].banner;
      if (bannerArray.length > 1) {
        var weightArray = [];
        var totalWeight = 0;
        bannerArray.forEach(function (value, index) {
          if (index) {
            weightArray.push(weightArray[index - 1] + value.weight);
          } else {
            weightArray.push(value.weight);
          }
          totalWeight += value.weight;
        });
        var randomNum = getRandomInit(1, totalWeight + 1);
        var ramdomIndex = getRamdomIndex(weightArray, randomNum);

        setTextLink(bannerArray[ramdomIndex], isMobile);
      } else {
        setTextLink(bannerArray[0], isMobile);
      }
    }
  } else if (data && data.default) {
    var bannerArray = data.default.banner;
    if (bannerArray.length > 1) {
      var weightArray = [];
      var totalWeight = 0;
      bannerArray.forEach(function (value, index) {
        if (index) {
          weightArray.push(weightArray[index - 1] + value.weight);
        } else {
          weightArray.push(value.weight);
        }
        totalWeight += value.weight;
      });
      var randomNum = getRandomInit(1, totalWeight + 1);
      var ramdomIndex = getRamdomIndex(weightArray, randomNum);

      setTextLink(bannerArray[ramdomIndex], isMobile);
    } else {
      setTextLink(bannerArray[0], isMobile);
    }
  }
};

var setNav = function (data) {
  var header = $("header");
  var lang = header.data("lang");
  if(lang.indexOf('zh') == -1) {
    lang = header.data("lang").split("_")[0];
  }
  var isMobile = header.data("ismobile");

  if (!isMobile) {
    var navWrapper = $(".opgg-header__navi");
    var desktopNav = $("<div class='navi-desktop'></div>");
    var expandNav = $("<div class='navi-expand navi-expand--hide'></div>");

    data.forEach(function (game, index) {
      var title = game.title[lang];
      if (!game.title[lang]) {
        title = game.title["en"];
      }

      if (index === 0) {
        var item = $(
          "<div class='navi__item navi__item--default'>" +
            "<img class='icon' src='" +
            game.icon +
            "'/>" +
            "<span>" +
            title +
            "</span>" +
            "</div>"
        );
        desktopNav.append(item);
      } else {
        var className = "navi__item";
        if (game.is_new) {
          className += " navi__item--new";
        }
        if (game.is_beta) {
          className += " navi__item--beta";
        }
        var item = $(
          "<a class='" +
            className +
            "' href='" +
            game.url +
            "'>" +
            "<div class='icon-wrapper'>" +
            "<img class='icon' src='" +
            game.icon +
            "'/>" +
            "</div>" +
            "<span>" +
            title +
            "</span>" +
            "</a>"
        );
        var item2 = item.clone();
        desktopNav.append(item);
        expandNav.append(item2);
      }
    });

    var expandWrapper = $('<div class="navi-expand__wrapper"></div>');
    var expandBtn = $('<button class="navi-expand__button">expand</button>');
    expandWrapper.append(expandBtn);
    expandWrapper.append(expandNav);
    desktopNav.append(expandWrapper);
    navWrapper.append(desktopNav);

    expandBtn.on('click', function() {
      if(expandNav.hasClass('navi-expand--hide')) {
        expandNav.removeClass('navi-expand--hide');
      } else {
        expandNav.addClass('navi-expand--hide');
      }
    });
  } else {
    var $navList = $(".opgg-header__navi-list");
    data.forEach(function (game, index) {
      if (index) {
        var title = game.title[lang];
        if (!game.title[lang]) {
          title = game.title["en"];
        }

        var className = "opgg-header__navi-poster-wrapper";
        if (game.is_new) {
          className += " opgg-header__navi-poster-wrapper--new";
        }
        if (game.is_beta) {
          className += " opgg-header__navi-poster-wrapper--beta";
        }

        var item = $(
          '<a class="opgg-header__navi-item" href="' +
            game.url +
            '" target="_blank"><div class="' +
            className +
            '"><img class="opgg-header__navi-poster" src="' +
            game.icon +
            '"></div><span class="opgg-header__navi-name">' +
            title +
            "</span></a>"
        );
        $navList.append(item);
      }
    });
  }
};

$(function () {
  var header = $("header");

  if (!header.length) {
    return;
  }

  var region = header.data("region").toLowerCase();
  var config = "https://opgg-gnb.akamaized.net/config/lol.all.config.json";

  $.ajax({
    url: config,
    success: function (data) {
      if (data.constructor == String) {
        try {
          data = JSON.parse(data);
        } catch (e) {}
      }

      setNav(data.games);
      setImageBanner(data.image_banner);
      setTextBanner(data.text_banner);
    },
    fail: function (error) {
      initBaseGNB();
    },
    error: function (error) {
      initBaseGNB();
    },
  });
});

var initBaseGNB = function () {
  var config = "https://opgg-gnb.akamaized.net/config/lol.all.config.json";
  $.ajax({
    url: config,
    success: function (data) {
      if (data.constructor == String) {
        try {
          data = JSON.parse(data);
        } catch (e) {}
      }

      setNav(data.games);
      setImageBanner(data.image_banner);
      setTextBanner(data.text_banner);
    },
    fail: function (error) {
      console.log(error);
    },
    error: function (error) {
      console.log(error);
    },
  });
};
