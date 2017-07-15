$(document).ready(function() {
    $('.simple-tip').tooltip({position: 'top', delay: 25})
    $('.dropdown-button').dropdown();

    if($('.sandbox-container').length) {
        $('button[data-sb-action]').on('click', function(e) {
            e.preventDefault();

            if(!$('.sandbox-container .step1').hasAttr('complete')) {
                var action = $(this).attr('data-sb-action');
                
                $('.sandbox-container .step1').attr('complete', 'true');
                $('.sandbox-container .code-snippet').attr('data-type', action);

                $('button[data-sb-action!="' + action + '"]').stop().fadeOut(400, function() {
                    if(action == 'ping' || action == 'favicon' || action == 'blacklist') {
                        $('.sb-param[data-param="server"]').show();
                    }

                    $('.sandbox-container .step2').stop().slideDown(200);
                });
            }

            return false;
        });

        var sandboxTyper;
        var sandboxTypeDelay = 250;

        $('.sandbox-container .step2 .sb-param input').on('keyup', function() {
            var self = $(this);
            clearTimeout(sandboxTyper);

            sandboxTyper = setTimeout(function() {
                onSandboxParamType(self);
            }, sandboxTypeDelay);
        }).on('paste', function() {
            var self = $(this);
            clearTimeout(sandboxTyper);

            sandboxTyper = setTimeout(function() {
                onSandboxParamType(self);
            }, sandboxTypeDelay);
        });

        function onSandboxParamType(e) {
            if($('.sandbox-container .step1').hasAttr('complete')) {
                var text = e.val();
                console.log(e.val());

                if(text && text.length > 1) {
                    // update code snippet
                    updateSnippet(text, $('.code-snippet').attr('current-lang'), 'type');
                } else {
                    // reset code snippet
                }
            }
        }

        $('li a[data-action="langChange"][data-lang]').on('click', function(e) {            
            $('.sandbox-container .snippet .card-title#language').html($(this).text());

            if($('.sandbox-container .step1').hasAttr('complete')) {
                updateSnippet($('.sandbox-container .step2 .sb-param input').val(), $(this).attr('data-lang'), 'langChange');
            } else {
                $('.code-snippet').attr('current-lang', $(this).attr('data-lang'));
            }
        });

        function updateSnippet(text, lang, trigger) {
            if($('.sandbox-container .step1').hasAttr('complete')) {
                $('.code-snippet').attr('current-lang', lang);

                $.ajax({
                    type: 'post',
                    url: '/sandbox/syntax',
                    data: {
                        ip: text,
                        type: $('.sandbox-container .code-snippet').attr('data-type'),
                        language: lang,
                        trigger: trigger
                    },
                    cache: false,
                    async: true,
                    success: function(resp) {
                        $('.sandbox-error').stop().slideUp(350);
                        $('.code-snippet .code-info').slideUp(250);
                        $('.code-snippet pre code').text(resp);
                        $('pre code').each(function(i, block) {
                            hljs.highlightBlock(block);
                        });
                    },
                    error: function(e1, e2, e3) {
                        if(e1.statusCode == 429) {
                            // too many
                            $('.sandbox-error .error-text').html('You\'re typing too quick for us! Please slow down and try again.');
                        } else if(e1.statusCode == 400) {
                            $('.sandbox-error .error-text').html('An internal error occured while rendering your sandbox!');
                        } else {
                            $('.sandbox-error .error-text').html('Something went wrong while rendering your sandbox!');
                        }

                        $('.sandbox-error').stop().slideDown(250);
                    }
                });
            }
        }
    }

    if($('button.docs-btn[data-ajax]').length && $('.response#docs-ajax-response').length) {
        $('button.docs-btn[data-ajax').on('click', function(e) {
            var ele = $(this);
            e.preventDefault();

            $('#docs-ajax-response').text('Please wait...');

            $.ajax({
                url: '/v3/' + ele.attr('data-ajax') + '/' + ele.attr('data-ajax-arg'),
                type: ele.attr('data-ajax') == 'server/favicon' ? 'head' : 'get',
                async: true,
                cache: false,
                success: function(data, textStatus, obj) {
                    console.log(data, obj, typeof data);
                    var resp = typeof data == 'object' ? JSON.stringify(data, null, 4) : (typeof data == 'string' ? data : '<img src="/v3/' + ele.attr('data-ajax') + '/' + ele.attr('data-ajax-arg') +'">');
                    $('.response#docs-ajax-response').html('<kbd class="response-heading">Headers</kbd><p>' + obj.getAllResponseHeaders() + '</p><kbd class="response-heading">Response</kbd><p>' + resp + '</p>');
                    $('html, body').animate({
                        scrollTop: $('.response#docs-ajax-response').offset().top - 130
                    }, 300);
                },
                error: function(e1, e2, e3) {
                    $('.response#docs-ajax-response').text('An unexpected error occured, please try again later!');
                }
            })
        });
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

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};