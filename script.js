$(document).ready(function () {
    let backgroundImages = [
        'alvan-nee-nGQx3WGA_hE-unsplash.jpg',
        'jakub-flis-pXcTpEj6nCw-unsplash.jpg',
        'krzysztof-kowalik-2pnozU26QBo-unsplash.jpg',
        'pawel-czerwinski-g0eRErPBoTA-unsplash.jpg'
    ];
    let currentImageIndex = 0;

    // Function to change the background image on clicking the header
    $('h1').click(function () {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        console.log("Background image changed to: " + backgroundImages[currentImageIndex]); // Debugging log
        $('body').css('background-image', `url(${backgroundImages[currentImageIndex]})`);
    });

    // Function to display current time in a dialog
    // Function to display current time in a dialog
    $('#timeButton').click(function () {
        const now = new Date();
        const formattedTime = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
        $('#time').html(`Current Time: ${formattedTime}`);

        // Initialize the dialog
        $('#time').dialog({
            position: { my: "right", at: "right", of: window },
            modal: true,
            title: '',

            create: function () {
                // Hide the default close button
                $(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
            },

            buttons: {
                OK: function () {
                    $(this).dialog('close');
                }
            }
        });

        // Optionally, you can set visibility to hidden or keep it visible
        $('#time').css('visibility', 'visible');
    });


    // Call the apiSearch function on clicking the search button
    $('#searchButton').click(function () {
        apiSearch(); // This calls your search function as it is
    });


    // Unchanged apiSearch function
    function apiSearch() {
        var params = {
            'q': $('#query').val(),
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };

        $.ajax({
            url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
            type: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': '7b0256befccb456d82ac3988107c9c07'
            }
        })
            .done(function (data) {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }


                $('#searchResults').css('visibility', 'visible');
                $('#searchResults').html(results);
                $('#searchResults').dialog();





            })
            .fail(function () {
                alert('error');
            });
    }

    $('#ifl').click(function () {
        imfeelinglucky()
    });

    function imfeelinglucky() {

        var params = {
            'q': $('#query').val(),
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };
        $.ajax({
            url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
            type: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': '7b0256befccb456d82ac3988107c9c07'
            }
        })
            .done(function (data) {
                var result = '';
                result = data.webPages.value[0].url;



                window.open(result, '_blank');
                console.log("opened url: " + result);

                return;

            })
            .fail(function () {
                alert('error');
            });
    }
});
