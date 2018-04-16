const $ = window.$;

export default function verify() {
  let activeform;
  let formerrors;

  function isEmail(email) {
    const regex = /^([a-zA-Zа-яА-ЯёЁ0-9_.+-])+@(([a-zA-Zа-яА-ЯёЁ0-9-])+\.)+([a-zA-Zа-яА-ЯёЁ0-9]{2,6})+$/;
    return regex.test(email);
  }
  function isTel(tel) {
    const regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,30}(\s*)?$/;
    return regex.test(tel);
  }
  function checkempty() {
    $(`#${activeform} [required]`).each(function () {
      if (!$(this).val()) {
        $(this).parent().addClass('error');
        $(this).siblings('.form__label_error').text('Поле не заполнено');
      } else {
        $(this).parent().removeClass('error');
        $(this).siblings('.form__label_error').text('');
      }
    });
  }
  function checkinputs() {
    checkempty();
    if (isEmail($(`#${activeform} input[data-type="email"]`).val()) === false) {
      $(`#${activeform} input[data-type="email"]`).parent().addClass('error');
      $(`#${activeform} input[data-type="email"]`).siblings('.form__label_error').text('Поле заполнено не верно');
    } else {
      $(`#${activeform} input[data-type="email"]`).parent().removeClass('error');
      $(`#${activeform} input[data-type="email"]`).siblings('.form__label_error').text('');
    }
    if (isTel($(`#${activeform} input[type="tel"]`).val()) === false) {
      $(`#${activeform} input[type="tel"]`).parent().addClass('error');
      $(`#${activeform} input[type="tel"]`).siblings('.form__label_error').text('Поле заполнено не верно');
    } else {
      $(`#${activeform} input[type="tel"]`).parent().removeClass('error');
      $(`#${activeform} input[type="tel"]`).siblings('.form__label_error').text('');
    }
  }
  function checkandsubmit() {
    formerrors = 0;
    $(`#${activeform}`).find('.error').each(() => {
      formerrors += 1;
    });
    if (formerrors === 0) {
      $(`#${activeform}`).submit();
    }
  }
  $(document).on('click', '.js-verify', (evt) => {
    const self = evt.target;
    activeform = $(self).parents('form').attr('id');
    evt.preventDefault();
    checkinputs();
    checkandsubmit();
    console.log('click');
  });

  $(document).on('input', 'form input, form textarea', (evt) => {
    const self = evt.target;
    $(self).parent().removeClass('error');
    activeform = $(self).parents('form').attr('id');
    formerrors = -1;
    if (!$(self).val()) {
      formerrors += 1;
      $(this).parent().addClass('error');
      $(this).siblings('.form__label_error').text('Поле не заполнено');
    } else {
      $(this).parent().removeClass('error');
      $(this).siblings('.form__label_error').text('');
    }
    if ($(self).data('type') === 'email') {
      if (isEmail($(`#${activeform} input[data-type="email"]`).val()) === false) {
        formerrors += 1;
        $(self).parent().addClass('error');
        $(self).siblings('.form__label_error').text('Поле заполнено не верно');
      } else {
        $(self).parent().removeClass('error');
        $(self).siblings('.form__label_error').text('');
      }
    }
    if ($(self).attr('type') === 'tel') {
      if (isTel($(`#${activeform} input[type="tel"]`).val()) === false) {
        formerrors += 1;
        $(self).parent().addClass('error');
        $(self).siblings('.form__label_error').text('Поле заполнено не верно');
      } else {
        $(self).parent().removeClass('error');
        $(self).siblings('.form__label_error').text('');
      }
    }
  });
}
