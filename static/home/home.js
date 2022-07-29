$(function(){
    $(document).ready( function () {
        $.ajax({
            url: 'http://localhost:8000/api/filter/building',
            type: 'GET',
            success: function(data){
                data.forEach(building => {
                    $('#building-selector').append($('<option/>', { 
                        value: building,
                        text : building 
                    }));
                }); 
            },
            error: function(data){
                console.log(data);
            }            
        });

        $.ajax({
            url: 'http://localhost:8000/api/filter/department',
            type: 'GET',
            success: function(data){
                data.forEach(department => {
                    $('#department-selector').append($('<option/>', { 
                        value: department,
                        text : department 
                    }));
                }); 
            },
            error: function(data){
                console.log(data);
            }            
        });

    });

    $('#building-selector').on('change', function(){
        const building = $(this).val();
        $('main').children('article').each(function(){
            $(this).show();
            if((building !== "All") && (building !== $(this).find('#building').text())){
                $(this).hide();
            }
        });
    });

    $('#department-selector').on('change', function(){
        const department = $(this).val();
        $('main').children('article').each(function(){
            $(this).show();
            if((department !== "All") && (department !== $(this).find('#department').text())){
                $(this).hide();
            }
        });
    });

    $("#search-bar").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $('main').children('article').each(function(){
            $(this).hide();
            const firstName = $(this).find('#firstName').attr("value").toLowerCase();
            const lastName = $(this).find('#lastName').text().toLowerCase();
            if(firstName.includes(" ")) {
                const firstNameSplit = firstName.split(' ');
                firstNameSplit.forEach(fn => {
                    if(fn.startsWith(value) || lastName.startsWith(value)){
                        $(this).show();
                    }
                });
            } else {
                if(firstName.startsWith(value) || lastName.startsWith(value)){
                    $(this).show();
                }
            }
        });
    });

    $('#logout-btn').on("click", function(e){
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/logout',
            type: 'POST',
            success: function(data){
                console.log(data);
            },
            error: function(data){
                console.log(data);
            }            
        });

        location.reload();
    });

    $('#refresh-btn').on("click", function(e) {
        e.preventDefault();
        location.reload();
    });
});


