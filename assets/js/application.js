$(document).ready(function() {
    $(".dropdown-button").dropdown();

    if($('.api-key-box').length) {
        /*
         * TODO: Add click-to-copy
         */

        /*
            $('.api-key-box').on('mouseover', function(e) {
                $('.api-key-copy').stop().fadeIn(350);
            });
            $('.api-key-box').on('mouseleave', function(e) {
                $('.api-key-copy').stop().fadeOut(150);
            });
        */

        $('.api-key-regenerate').on('click', function(e) {
            e.preventDefault();
            $('#manage-error').stop().slideUp(200);

            $.ajax({
                url: '/manage/regenerate-apikey',
                type: 'post',
                success: function(resp) {
                    if(resp.status == 200) {
                        $('.api-key-text').text(resp.key);

                        if(!$('.api-regen-history').length) {
                            // TODO Add table
                        }

                        $('#api-regen-history-title').fadeIn(200)
                        $('<tr><td><strong>Re-generated API key to</strong><br>&nbsp;<span class="blur text-muted">' + resp.key + '</span></td><td><strong>' + resp.geo.country + '</strong><br><small>' + resp.browser + ' &bull; ' + resp.os + '</small></td><td><abbr data-time="' + resp.moment_source + '"></abbr></td></tr>').hide().prependTo('#api-regen-body').fadeIn(500);
                        if($('#api-regen-body tr').length > 20) {
                            $('#api-regen-body tr:last').remove();
                        }
                    } else {
                        $('#manage-error').stop().html('<strong>Error:</strong> ' + resp.error).slideDown(450);
                    }

                    $('abbr[data-time]').each(function(i, obj) {
                        var now = moment(new Date($(obj).attr('data-time')));
                        $(obj).text(now.fromNow()).attr('title', now.format('MMMM Do YYYY, h:mm:ss a'));
                    });
                },
                error: function(e1, e2, e3) {
                    $('#manage-error').stop().html('<strong>Error:</strong> An error occured while processing that request!').slideDown(450);                
                }
            })

            return false;
        })
    }

    if($('#api-usage-body').length) {
        function getAPIHistory() {
            $.ajax({
                url: '/manage/history',
                type: 'post',
                data: {
                    timeframe: $('#api-key-timeframe').attr('data-tf')
                },
                success: function(resp) {
                    if($('#api-history-load').is(':visible')) {
                        $('#api-history-load').fadeOut(200, function() {
                            $('#api-usage-body').hide().html(resp).fadeIn(300);
                        });
                    } else {
                        $('#api-usage-body').html(resp);
                    }
                },
                error: function(e1, e2, e3) {
                    $('#api-usage-body').hide();

                    if($('#api-history-load').is(':visible')) {
                        $('#api-history-load').fadeOut(200, function() {
                            $('#api-history-load').html(e2 == 400 ? ('<strong>Error: </strong> ' + e3) : 'An error occured').fadeIn(300);;
                        });
                    } else {
                        $('#api-history-load').html(e2 == 400 ? ('<strong>Error: </strong> ' + e3) : 'An error occured');
                    }
                }
            });
        }

        getAPIHistory();
    }

    if($('form[data-action="new_campaign"]').length) {
        $('form[data-action="new_campaign"]').on('submit', function(e) {
            e.preventDefault();
            $('#create-error').stop().slideUp(200);

            $.ajax({
                url: '/campaigns',
                type: 'post',
                data: $(this).serialize(),
                success: function(resp) {
                    if(resp.status == 200) {
                        $('#create-error').html('<strong>Campaign created!</strong> We are redirecting you to PayPal now..').removeClass('red').addClass('green').slideDown(350);
                        window.location.href = resp.paymentUrl;
                    } else {
                        $('#create-error').stop().html('<strong>Error:</strong> ' + resp.error).slideDown(250);
                    }
                },
                error: function(e1, e2, e3) {
                    console.log(e1, e2, e3);
                    $('#create-error').stop().html('<strong>Error:</strong> An error occured while processing that request!').slideDown(250);
                }
            })

            return false;
        });
    }
});

function isImgurLink(str) {
    var match = str.toLowerCase().match('((https:\/\/)|(http:\/\/)*)((i.)|(m.)|(www.))*(imgur.com)[\/].+');
    return !match ? false : match.length > 0;
}