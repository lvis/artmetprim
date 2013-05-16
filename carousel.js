function Carousel(containerId)
{
    var _transition = 'fade';

    var _transitionSpeed = 500;

    var _showArrows = true;

    var _showIndicators = true;

    var _period;

    var _contentSwitchAuto = true;

    var _contentSwitchInterval = 4000;

    var _slideIndex = 0;

    var activeClass = 'active';

    var container = document.getElementById(containerId);
    container.setAttribute("class", "carouselContainer");

    var content = document.createElement("div");
    content.setAttribute("style", "overflow: hidden;");
    var indicatorsContainer = document.createElement("ol");
    indicatorsContainer.setAttribute("class", "indicatorsContainer");

    var arrowPrevious = document.createElement("div");
    arrowPrevious.setAttribute("class", "arrowPrevious");

    var arrowNext = document.createElement("div");
    arrowNext.setAttribute("class", "arrowNext");

    var viewsCount = container.children.length;

    var views = new Array();

    var indicators = new Array();

    var handle_indicatorClick = function(event)
    {
        this.slideIndex = event.target.value;
    };

    var handle_arrowPreviousClick = function(event)
    {
        this.previous();
    };

    var handle_arrowNextClick = function(event)
    {
        this.next();
    };

    var fadeOut = function(senderElement, speed)
    {
        if ( typeof speed === 'undefined')
        {
            speed = 500;
        }

        if (senderElement.style.display != 'none')
        {
            var currentOpacity = 1;
            var fadeOutIntervalId;
            fadeOutIntervalId = setInterval(function()
            {
                currentOpacity -= 0.05;
                senderElement.style.opacity = currentOpacity;
                if (currentOpacity <= 0)
                {
                    clearInterval(fadeOutIntervalId);
                    senderElement.style.display = 'none';
                    senderElement.style.opacity = null;
                }
            }, speed / 20);
        }
    };

    var resetContentSwitchTimer = function()
    {
        if (_contentSwitchAuto == true)
        {
            this.contentSwitchAuto = false;
            this.contentSwitchAuto = true;
        }
    };

    var resizeDependingOnContent = function()
    {
        content.style.width = content.children[_slideIndex].offsetWidth + "px";
        content.style.height = content.children[_slideIndex].offsetHeight + "px";
    }
    if (viewsCount != 0)
    {
        for (var i = 0; i < viewsCount; i++)
        {
            var containerElement = container.children[0];
            container.removeChild(containerElement);
            if (i != 0)
            {
                containerElement.style.display = "none";
            }
            else
            {
                containerElement.style.display = "block";
            }
            containerElement.style.position = "absolute";
            containerElement.style.zIndex = "999";
            content.appendChild(containerElement);
            var indicator = document.createElement("li");
            indicator.setAttribute("value", i);
            //indicator.addEventListener("click",
            // handle_indicatorClick.bind(this));
            $(indicator).on("click", this, function(event)
            {
                event.data.slideIndex = event.target.value;
            });
            indicatorsContainer.appendChild(indicator);
            if (i == _slideIndex)
            {
                indicator.setAttribute("class", activeClass);
            }
        }
        if (_showIndicators == false)
        {
            indicatorsContainer.style.display = "none";
        }
        container.appendChild(content);
        container.appendChild(indicatorsContainer);
        // arrowPrevious.addEventListener("click",
        // handle_arrowPreviousClick.bind(this));
        // arrowNext.addEventListener("click", handle_arrowNextClick.bind(this));
        $(arrowPrevious).on("click", this, function(event)
        {
            event.data.previous();
        });
        $(arrowNext).on("click", this, function(event)
        {
            event.data.next();
        });
        if (_showArrows == false)
        {
            arrowPrevious.setAttribute("display", "none");
            arrowNext.setAttribute("display", "none");
        }
        container.appendChild(arrowPrevious);
        container.appendChild(arrowNext);
        resizeDependingOnContent();
    }

    Object.defineProperty(this, 'transition',
    {
        get: function()
        {
            return _transition;
        },
        set: function(value)
        {
            if (_transition !== value)
            {
                _transition = value;
            }
        }
    });

    Object.defineProperty(this, "transitionSpeed",
    {
        get: function()
        {
            return _transitionSpeed;
        },
        set: function(value)
        {
            if (_transitionSpeed !== value)
            {
                _transitionSpeed = value;
            }
        }
    });

    Object.defineProperty(this, "showArrows",
    {
        get: function()
        {
            return _showArrows;
        },
        set: function(value)
        {
            if (_showArrows !== value)
            {
                _showArrows = value;
            }
        }
    });

    Object.defineProperty(this, "showIndicators",
    {
        get: function()
        {
            return _showIndicators;
        },
        set: function(value)
        {
            if (_showIndicators !== value)
            {
                _showIndicators = value;
            }
        }
    });

    Object.defineProperty(this, "contentSwitchAuto",
    {
        get: function()
        {
            return _contentSwitchAuto;
        },
        set: function(value)
        {
            if (_contentSwitchAuto != value)
            {
                _contentSwitchAuto = value;

                if (_contentSwitchAuto == true)
                {
                    _period = setInterval(this.next.bind(this), _contentSwitchInterval);
                }
                else
                {
                    clearInterval(_period);
                }
            }
        }
    });

    Object.defineProperty(this, "contentSwitchInterval",
    {
        get: function()
        {
            return _contentSwitchInterval;
        },
        set: function(value)
        {
            if (_contentSwitchInterval > 0 && _contentSwitchInterval != value)
            {
                _contentSwitchInterval = value;
                resetContentSwitchTimer();
            }
        }
    });

    Object.defineProperty(this, "slideIndex",
    {
        get: function()
        {
            return _slideIndex;
        },
        set: function(value)
        {
            if (_slideIndex !== value)
            {
                if (_transition == 'fade')
                {
                    content.children[value].style.display = "block";
                    content.children[value].style.zIndex = "990";
                    content.children[_slideIndex].style.zIndex = "999";
                    fadeOut(content.children[_slideIndex], this.transitionSpeed);
                }

                indicatorsContainer.children[_slideIndex].removeAttribute("class");
                indicatorsContainer.children[value].setAttribute("class", activeClass);
                _slideIndex = value;
                resizeDependingOnContent();
            }
        }
    });

    // Show Previous Slide
    this.previous = function()
    {
        if (_slideIndex > 0)
        {
            this.slideIndex--;
        }
        else
        {
            this.slideIndex = (viewsCount - 1);
        }
    };

    // Show Next Slide
    this.next = function()
    {
        if (this.slideIndex < (viewsCount - 1))
        {
            this.slideIndex++;
        }
        else
        {
            this.slideIndex = 0;
        }
    };

    this.toString = function()
    {
        return Carousel.name;
    };
};