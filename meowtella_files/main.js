/*
 justpremium_format_template v1.2.7 2021-10-27 
 */

"use strict";
var Premium = Premium || {};

Premium.creative = {
    init: function() {
        /* START OF CUSTOM JS */

        /* Premium.utils.blockScroll --------------------------------------------------- */
        Premium.utils.blockScroll = new function() {
            var yOffset;
            var blockScrollHandler = function(e) {
                window.top.scrollTo(0, yOffset)
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            };
            var block = this.block = function(block) {
                yOffset = window.top.pageYOffset;
                try {
                    if (block) {
                        window.top.addEventListener("scroll", blockScrollHandler, { passive: false });
                        window.addEventListener("scroll", blockScrollHandler, { passive: false });
                        window.top.addEventListener("wheel", blockScrollHandler, { passive: false });
                        window.addEventListener("wheel", blockScrollHandler, { passive: false });
                    } else {
                        window.top.removeEventListener("scroll", blockScrollHandler, { passive: false });
                        window.removeEventListener("scroll", blockScrollHandler, { passive: false });
                        window.top.removeEventListener("wheel", blockScrollHandler, { passive: false });
                        window.removeEventListener("wheel", blockScrollHandler, { passive: false });
                    }
                } catch (e) {}
            }
            window.addEventListener("unload", function() {
                console.log("unload");
                block(false);
            })
        };
        /* Premium.utils.blockScroll END ----------------------------------------------- */

        // Premium.video.SyncAttemptInterval = 0;

        if (document.body.id !== "body_expanded") {
            Premium.communicator.init(4);
        }

        if (Premium.template) {
            if (Premium.template.getEntranceAnimations) {
                var delay = document.body.id === "body_top" ? 2 : 1;
                var entranceAnimations = Premium.template.getEntranceAnimations(delay);
                Premium.communicator.api.receiveMessage(function(mess) {
                    if (mess.action === "start-entrance-animation") {
                        entranceAnimations.play();
                    }
                });
                Premium.communicator.api.sendMessage({ action: "start-entrance-animation" });
            }
            if (Premium.template.initButtonEffects) {
                Premium.template.initButtonEffects(2, "assets-template/");
            }
        }

        // Entrance animations END -------------------------------------------------

        var sectionCountdownEl = document.querySelector(".jpt-section-countdown");
        if (sectionCountdownEl) {
            var endDate = new Date("October 29 2021 9:30 GMT+0100");
            var jpCountdown = new JPCountdown(".jpt-countdown", endDate);
            jpCountdown.on("update", function(timeInfo, totalSecondsLeft) {
                timeInfo = Premium.template.convertCountdownTime(totalSecondsLeft);
                if (timeInfo.wholeDays > 0) {
                    sectionCountdownEl.querySelector(".jpt-countdown").classList.add("narrow");
                } else {
                    sectionCountdownEl.querySelector(".jpt-countdown").classList.remove("narrow");
                }
                sectionCountdownEl.querySelector(".jpt-countdown-days-container").style.display = timeInfo.wholeDays > 0 ? "flex" : "none";
                sectionCountdownEl.querySelector(".jp-countdown-days").innerHTML = timeInfo.wholeDays;
                sectionCountdownEl.querySelector(".jp-countdown-hours").innerHTML = timeInfo.wholeHours;
                Premium.communicator.api.sendMessage({ action: "countdown-update", time: timeInfo })
            })
            jpCountdown.start();
        }

        switch (document.body.id) {
            case "body_top":
                var sectionCopyEl = document.querySelector(".jpt-section-copy");
                var sectionVideoEl = document.querySelector(".jpt-section-video");;
                var videoEl = document.querySelector(".jpt-video-container VIDEO");
                var vidRatio, targetExpandedWidth, targetExpandHeight;
                var isFirstCall = true;
                var prevWinWidth;

                function videoDimensionsHandler() {
                    vidRatio = videoEl.videoWidth / videoEl.videoHeight;
                    var creativeMainEl = Premium.product.creativeMainEl();
                    targetExpandedWidth = creativeMainEl.clientHeight * vidRatio;
                    targetExpandHeight = creativeMainEl.clientWidth / vidRatio;
                    targetExpandHeight *= 1000 / creativeMainEl.clientWidth;
                    if (sectionVideoEl) sectionVideoEl.style.width = targetExpandedWidth + "px";
                    if (sectionCopyEl) {
                        sectionCopyEl.style.width = creativeMainEl.clientWidth - targetExpandedWidth + "px";
                        sectionCopyEl.style.height = creativeMainEl.clientHeight + "px";
                    }
                    if (isFirstCall) {
                        isFirstCall = false;
                        window.addEventListener("resize", resizeHandler)
                    }
                }

                function resizeHandler() {
                    if (videoEl) {
                        if (prevWinWidth && prevWinWidth !== window.innerWidth) {
                            videoDimensionsHandler();
                            PremiumJpControls.resizeAll();
                        }
                        prevWinWidth = window.innerWidth;
                    }
                }

                Premium.creative.createVideoPlayerAppended = function(video) {
                    videoEl = video;
                    requestAnimationFrame(function() {
                        if (videoEl.readyState < 1) {
                            videoEl.addEventListener("loadedmetadata", videoDimensionsHandler)
                        } else {
                            videoDimensionsHandler();
                        }
                    });
                    Premium.video.sync(videoEl, 1);
                    Premium.video.switchOnScroll(videoEl.parentElement, 2);

                    Premium.expand.callOnLoaded(function() {
                        setTimeout(function() { video.muted = false }, 500); 
                    }, "id1");
                    PremiumJpControls.callOnClickFullScreen(function() {
                        Premium.expand.expand("expanded.html", "width:70vw;height:40vw;")
                    });
                    var prom = videoEl.play();
                    if (prom) {
                        prom.catch(function() {})
                    }
                }


                break;

            case "body_left":
                Premium.creative.createVideoPlayerAppended = function(video) {
                    video.volume = 0;
                    Premium.expand.callOnLoaded(function() {
                        setTimeout(function() { video.muted = false }, 500); 
                    }, "id1");
                    PremiumJpControls.callOnClickFullScreen(function() {
                        Premium.expand.expand("expanded.html", "width:70vw;height:40vw;")
                    });
                    Premium.video.sync(video, 1);
                    Premium.video.switchOnScroll(document.querySelector(".jpt-video-container"), 2, function(pos) {
                        if (pos === "down") {
                            gsap.timeline()
                                .set(".jpt-video-container", { y: 50 })
                                .set(".jpt-video-container .jp-controls-holder", { opacity: 0 })
                                .to(".jpt-background-image", { duration: .5, opacity: 0, y: -50 }, 0)
                                .to(".jpt-video-container", { duration: .5, opacity: 1, y: 0, onUpdate: PremiumJpControls.resizeAll }, 0.3)
                                .to(".jpt-video-container .jp-controls-holder", { opacity: 1, duration: 0 })
                        } else {
                            gsap.timeline()
                                .set(".jpt-background-image", { y: -50 })
                                .to(".jpt-video-container", { duration: .5, opacity: 0, y: 50 }, 0)
                                .to(".jpt-background-image", { duration: .5, opacity: 1, y: 0 }, 0.3)
                        }
                    });
                    var prom = video.play();
                    if (prom) {
                        prom.catch(function() {})
                    }
                }
                break;

            case "body_right":
                if (document.querySelector("[jp-carousel]")) {
                    var carouselLabels = ["", "", "", ""];
                    var carousel = JPCarousel.getObject("[jp-carousel]");
                    carousel.autoShowTimer(3000);
                    carousel.setCallOnShowItem(function(index) {
                        gsap.timeline()
                            .to(".jp-carousel ~ .jpt-p", .2, { opacity: 0 })
                            .add(function() {
                                document.querySelector(".jp-carousel ~ .jpt-p").innerText = carouselLabels[index];
                            })
                            .to(".jp-carousel ~ .jpt-p", .4, { opacity: 1 })
                    })
                }
                break;

            case "body_back":
                // back panel code here

                break;

            case "body_expanded":
                Premium.creative.createVideoPlayerAppended = function(video) {
                    video.volume = 0;
                    Premium.video.sync(video, undefined, Premium.video.SyncType_Get);
                    video.addEventListener("playing", function() {
                        // setTimeout(function(){
                        document.body.style.display = "block";
                        document.body.style.opacity = 1;
                        // }, 200)  
                    }, { once: true })
                    var prom = video.play();
                    if (prom) {
                        prom.catch(function() {})
                    }
                }
                
                // Premium.utils.blockScroll.block(true)

                break;
        }

        var smallPrintEl = document.querySelector(".jpt-legals");
        if (smallPrintEl) {
            var smallPrintContentEl = document.querySelector(".jpt-legals-content");
            var doSmallPrint = function() {
                if (smallPrintContentEl.scrollHeight <= smallPrintEl.clientHeight) {
                    smallPrintEl.classList.remove("jpt-legals-edge");
                } else {
                    smallPrintEl.classList.add("jpt-legals-edge");
                }
            }
            window.addEventListener("resize", doSmallPrint);
            window.addEventListener("load", doSmallPrint, { once: true })
        }

        /* END OF CUSTOM JS */
    }
}