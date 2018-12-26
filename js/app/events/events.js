function Events()
{
	this.Init = function()
	{
		//initSortable();
		initControls();

	};
	
	function initSortable()
	{
		var objSortableWrapper = new SortableWrapper();
		var categoryId = objSortableWrapper.GetParameterByName('id');
		var queryParams = { id: categoryId }
		var options = { tablename:'sortable', urlServer: SITE_RELATIVE_URL + 'events', colorRowOdd:'eeeeee', colorRowEven:'FEFEFE', queryParams:queryParams};
		objSortableWrapper.SetOptions(options);
		objSortableWrapper.Init();
		
		$('.grid_view tr').addClass('allow_drag'); // class to show hand cursor
	}
	
	function initControls()
	{
		$('#chkAll').click(function() {
			htmlCtl.ToggleCheckboxes('chkAll','multi_checkbox');
		});

        $('#new-events-modal').on('show.bs.modal', function (e) {
            $(this).find("#new-event-title").attr('value', e.relatedTarget.getAttribute('title'));
            initStartDateTimePickers($(this), e.relatedTarget.getAttribute('data-date-start'));
            initEndDateTimePickers($(this), e.relatedTarget.getAttribute('data-date-end'));
            selectOrResetEventCssClass($(this), e.relatedTarget.getAttribute('data-event-css-class'));
            initSelect2NewEvent($(this));
            addModalEventDescription($(this), e.relatedTarget.getAttribute('data-description'));
            addModalEventShortDescription($(this), e.relatedTarget.getAttribute('data-short-description'));
        });
        $('.event-date-end').on('change', function (e) {
            //debugger;
            (language==='ro') ? new Date(moment($(this).val(), 'DD/M/YYYY').format('YYYY/M/DD')).getTime() : new Date($(this).val()).getTime()

        })
	}

	this.initEditEventModal = function(event, modal){
        initStartDateTimePickers(modal, event.start);
        initEndDateTimePickers(modal, event.end);
        selectOrResetEventCssClass(modal, event.class);
        initSelect2EditEvent(modal);
        addModalEventDescription(modal, event.description);
        addModalEventShortDescription(modal, event.short_description);
    };

    function addModalEventDescription(modal, description){
        $(modal).find('.event-description').val((description) ? description : '');
    }

    function addModalEventShortDescription(modal, shortDescription){
        $(modal).find('.event-short-description').val((shortDescription) ? shortDescription : '');
    }

    function addSelect2SelectedColorEvent(modal, selectedOptionEventColorClass){
        var select2Selection = modal.find('.select2-selection');
        var eventColorClass = select2Selection.attr('data-event-color-class');
        select2Selection.removeClass(eventColorClass);
        if(selectedOptionEventColorClass){
            select2Selection.attr('data-event-color-class',selectedOptionEventColorClass).addClass(selectedOptionEventColorClass);
        }
    }

    function selectOrResetEventCssClass(modal, eventCssClass){

        if(eventCssClass){
            $(modal).find('.event-css-classes option').each(function () {
                $(this).removeAttr('selected');
                if (this.value === eventCssClass) {
                    this.setAttribute('selected', 'selected')
                }
            });
        }
        else{
            $(modal).find('.event-css-classes').val('');
            $(modal).find('.event-css-classes option:selected').removeAttr('selected');
        }
    }

    function initStartDateTimePickers(modal, startDateInMilliseconds)
    {
        $(modal).find('.event-date-start').daterangepicker({
            timePicker: true,
            timePicker24Hour: true,
            singleDatePicker: true,
            startDate: (startDateInMilliseconds) ? new Date(parseInt(startDateInMilliseconds)) : moment().set({hour:18, minute:0}),
            locale: {
                format: (language==='ro') ? 'DD/M/YYYY HH:mm' : 'YYYY/M/DD HH:mm'
            }
        });

    }

    function initEndDateTimePickers(modal, endDateInMilliseconds)
    {
        $(modal).find('.event-date-end').daterangepicker({
            timePicker: true,
            timePicker24Hour: true,
            singleDatePicker: true,
            startDate:  (endDateInMilliseconds) ? new Date(parseInt(endDateInMilliseconds)) : moment().set({hour:20, minute:0}),
            locale: {
                format: (language==='ro') ? 'DD/M/YYYY HH:mm' : 'YYYY/M/DD HH:mm'
            }
        });
    }

    function initSelect2EditEvent(modal){
        $('#select-edit-events').select2({
            templateResult: function (data, container) {
                if (data.element) {
                    //debugger;
                    $(container).addClass($(data.element).attr("data-event-color-class"));
                    $(container).attr("data-event-color-class", $(data.element).attr("data-event-color-class"));
                }
                return data.text;
            },
            placeholder: "Select a color",
            templateSelection: function(data){
                if(data.selected){
                    addSelect2SelectedColorEvent(modal, data.element.getAttribute('data-event-color-class'));
                }
                return data.text;
            }
        });
    }

    function initSelect2NewEvent(modal) {
        $('#select-new-events').select2({
            templateResult: function (data, container) {
                if (data.element) {
                    //debugger;
                    $(container).addClass($(data.element).attr("data-event-color-class"));
                    $(container).attr("data-event-color-class", $(data.element).attr("data-event-color-class"));
                }
                return data.text;
            },
            placeholder: "Select a color",
            templateSelection: function(data, container){
                if(data.selected){
                    addSelect2SelectedColorEvent(modal, data.element.getAttribute('data-event-color-class'));
                }
                return data.text;
            }
        });
    }

    function initPopovers()
	{
        var popOverSettings = {
            placement: 'top',
            container: 'body',
            //html: true,
            //trigger: 'manual',
            selector: '[data-toggle="popover"]', //Specify the selector here
			/*content: function () {
			 return $('#popover-content').html();
			 }*/
        };

        $('#calendar').popover(popOverSettings);
		$('body').on('click', function (e) {
            var calendarCell = $('.calendar-event');
            var popovers = $('.popover');
            var tooltips = $('.tooltip');
            if (calendarCell.has(e.target).length === 0 && !calendarCell.is(e.target) && popovers.length) {
                $('[data-toggle="popover"]').popover('destroy');
                popovers.remove();
            }
            if(tooltips.length){
                tooltips.remove();
            }
        });
	}
}
var objEvents = new Events();
objEvents.Init();