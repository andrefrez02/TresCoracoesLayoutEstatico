var onloadCallback = function () {
    var publicKey = "6LdCdsoaAAAAAHsm1aiKES1mrf0LNBKWkDZkkIw7";
    var divs = document.querySelectorAll('.g-recaptcha');

    [].forEach.call(divs, function (div) {
        var form = div.parentElement;
        var btn = form.querySelector('[type=submit]');
        const loader = form.querySelector('.loader');

        var widgetId = grecaptcha.render(div.id, {
            'sitekey': publicKey,
            'size': 'invisible',
            "callback": function (token) {
                return new Promise(function (resolve, reject) {
                    form.submit();
                });
            }
        });

        btn.setAttribute('data-recaptcha-id', widgetId);

        btn.addEventListener("click", function (e) {
            var id = btn.getAttribute('data-recaptcha-id');
            if (form.checkValidity()) {
                validate(e, id)
                loader.removeAttribute('hidden');
                btn.setAttribute('hidden', true);
                return false;
            }
            else {
                loader.setAttribute('hidden', true);
                btn.removeAttribute('hidden');
            }
        }, false);
    });
};

function validate(e, id) {
    e.preventDefault();
    grecaptcha.execute(id);
}