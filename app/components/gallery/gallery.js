const $ = window.$;

export default function RemoveItem() {
  $(document).on('click', '.js-remove-item', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).hasClass('.js-remove-item') ? evt.target : $(evt.target).closest('.js-remove-item');
    $(self).closest('.gallery__item').remove();
  });
}
