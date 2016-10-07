$(function() {
	$(".page-heading").click(function() {
		var id = $(this).data("id");

		$("#"+id+"-content").slideToggle(100);
	});

	var types = ["h1", "a", "p", "strong"];

	$(".thing-input").keyup(function(e) {
		var id = $(this).data("id");
		var the_p = $("#"+id+"-p");
		var the_form = $("#"+id+"-thing-form");
		var p_number = the_p.data("number");

		if (e.which == 38) {
			if (p_number > 0) {
				var lastNumber = p_number - 1;
				var new_element = "<" + types[lastNumber] + ' class="thing-example" id="' + id + '-p" data-number="' + lastNumber + '">' + $(this).val() + '</' + types[lastNumber] + '>';

				the_p.remove();
				the_form.append(new_element);
				$("#"+id+"-hidden").val(types[lastNumber]);
			}
		}
		else if(e.which == 40) {
			if (p_number < types.length - 1) {
				var nextNumber = p_number + 1;
				var new_element = "<" + types[nextNumber] + ' class="thing-example" id="' + id + '-p" data-number="' + nextNumber + '">' + $(this).val() + '</' + types[nextNumber] + '>';
				the_p.remove();
				the_form.append(new_element);
				$("#"+id+"-hidden").val(types[nextNumber]);
			}
		}
		else {
			the_p.text($(this).val());
		}
	});

	$(".thing-button").click(function() {
		var id = $(this).data("id");
		var form = $("#"+id+"-form");
		$.ajax({
			type: "POST",
			url: form.attr("action"),
			data: form.serialize(),
			success: function(response) {
				alert("it worked");
			},
			error: function(response) {
				window.prompt(response);
			}
		});
	});

	$("#new-user").click(function() {
		$("#form_user").toggle();
	});

	$("#new-thing").click(function() {
		$("#form_thing").toggle();
	});
});