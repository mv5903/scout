class HTML {
    static setVisible = (element, isVisible) => {
        document.querySelector(element).style.display = isVisible ? 'block' : 'none'
    }
}



