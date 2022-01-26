 
 console.log("welcome");


    function dropdown() {
        document.getElementById("dropdownID").classList.toggle("show");
    }


    window.onclick = function (e) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


document.getElementById('error-btn').addEventListener('click', ()=>{
    document.getElementById('error').style.display = "none";
})




