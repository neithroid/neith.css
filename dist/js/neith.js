function isEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email));
}

document.addEventListener("DOMContentLoaded", function() {
    // Initial Event
    this.querySelectorAll("input, textarea, a").forEach(ele => {
        ele.addEventListener("click", function(e) {
            e.stopPropagation();
            let target = e.target;
            let isClicked = target.classList.contains("dirty");
            if(!isClicked) target.classList.add("dirty");
        });

        if (ele.type !== "radio" && ele.type !== "checkbox")
        {
            ele.addEventListener("keyup", function(e) {
                console.log(ele.type !== "radio");
                
                e.stopPropagation();
                let target = e.target;
                if (target.value) target.classList.add("valued");
                else target.classList.remove("valued");
            })
        }
    });

    //Wave Effect Event
    this.querySelectorAll('.wave-effect').forEach(ele => {
        ele.addEventListener('mousedown', function(e) {
            let _style = getComputedStyle(this),
            rect = this.getBoundingClientRect(),
            x = e.pageX - (rect.left + window.scrollX),
            y = e.pageY - (rect.top + window.scrollY),
            dia = Math.min(this.offsetHeight, this.offsetWidth, 100),
            // wave canvas
            wave = document.createElement('div');
            
            wave.classList.add('wave');
            this.appendChild(wave);
            if (this.closest('.wave-effect'))
                e.stopPropagation();

            if (!_style.position || _style.position == 'static')
                this.style.position = 'relative';

            let waveAnimation = document.createElement('div');
            waveAnimation.classList.add('wave-animation');
            Object.assign(waveAnimation.style, 
                {
                    "background": this.getAttribute('wave-color'),
                    "width": dia + "px",
                    "height": dia + "px",
                    "left": x - (dia/2) + "px",
                    "top": y - (dia/2) +"px"
                });
            wave.appendChild(waveAnimation);
            waveAnimation.onanimationend = function() {
                this.parentElement.remove();
            };
        });
    });

    /* 
        *** Dropdown Event
        ** Dropdown Parent Event
    */
    this.querySelectorAll(".dropdown-items[disabled]").forEach(ele => {
        ele.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
        })
    })

    this.querySelectorAll(".dropdown .dropdown-toggler[data-target]").forEach(ele => {
        const dropdownTarget = ele.getAttribute("data-target");
        ele.addEventListener("click", function(e) {
            // Prevent to select parent element when clicked
            e.stopPropagation(); 
            // Remove "active" class dropdown when the other toggler clicked
            document.querySelectorAll(".dropdown-toggler, .sub-dropdown-toggler").forEach(ele => {
                if (ele.getAttribute("data-target") != dropdownTarget) 
                    ele.classList.remove("active");
            });
            // Hide dropdown when the active class is gone
            if (!ele.classList.contains("active")) {
                document.querySelectorAll(".dropdown-content").forEach(ele => {
                    ele.classList.remove("show");
                });
            };
            // Prevent the dropdown to work when there's "disabled" attribute
            if (!ele.hasAttribute("disabled")) {
                document.getElementById(dropdownTarget).classList.toggle("show");
            };
        });
    });

    this.querySelectorAll(".dropdown .sub-dropdown-toggler[data-target]").forEach(ele => {
        const dropdownTarget = ele.getAttribute("data-target");
        ele.addEventListener("click", function(e) {
            e.stopPropagation();
            if (!e.target.hasAttribute("disabled"))
                document.getElementById(dropdownTarget).classList.toggle("show")
            ele.parentElement.querySelectorAll(".sub-dropdown-toggler").forEach(ele => {
                if (dropdownTarget != ele.getAttribute("data-target") && !e.target.hasAttribute("disabled")) {
                    ele.classList.remove("active");
                    ele.querySelectorAll(".dropdown-content").forEach(ele => {
                        ele.classList.remove("show");
                        ele.classList.remove("active");
                    });
                };
            });
        });
    });

    this.querySelectorAll(".dropdown-toggler, .sub-dropdown-toggler").forEach(ele => {
        ele.addEventListener("click", function(e) {
            e.stopPropagation();
            const target = e.target;
            if (document.getElementById(ele.getAttribute("data-target")).classList.contains("show"))
                target.classList.add("active");
            else 
                target.classList.remove("active");
        });
    });
    window.addEventListener("click", function(e) {
        e.stopPropagation();
        let dropdowns = this.document.querySelectorAll(".dropdown");
        const target = e.target;
        const dropdownTarget = target.getAttribute("data-target");
        if (!dropdownTarget && !target.matches(".dropdown-items")) {
            dropdowns.forEach(ele => {
                ele.querySelectorAll(".dropdown-content").forEach(ele => {
                    ele.classList.remove("active");
                    ele.classList.remove("show");
                });
                ele.querySelectorAll(".dropdown-toggler, .sub-dropdown-toggler").forEach(ele => {
                    ele.classList.remove("active");
                });
            });
        };
    });
});