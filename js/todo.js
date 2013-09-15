window.Todo = {
	completedClass: 'completed',

	exist: function(x) {
		return x != null;
	},
	
	truth: function(x) {
	   return (x !== false) && Todo.exist(x);
	},
	
	doWhen: function(cond, action) {
		if(Todo.truth(cond)) {
			return action();
		} else {
			return undefined;
		}
	},

	removeCompleted: function() {
		$('.' + Todo.completedClass).remove();
	},

	hideClearCompleted: function() {
		$('#clearCompleted').hide();
	},
	
	showClearCompleted: function() {
		$('#clearCompleted').show();
	},

	existsCompleted: function() {
		return $('.' + Todo.completedClass).length != 0;
	},

	setup: function() {
		var create = $('.create');
		create.hide();
		var $clearCompleted = $('#clearCompleted');
		$clearCompleted.hide().on('click', function(e) {
			e.preventDefault();
			Todo.removeCompleted();
			Todo.hideClearCompleted();
		});

		$('.new').click(function(e) {
			e.preventDefault();
			$(this).hide();
			create.show();
			$('.create input[type="text"]').focus();
		});

		create.submit(function(e) {
			e.preventDefault();
			var $input = $('.create input[type="text"]');
			var todoTxt = $input.val();
			if (todoTxt != "") {
				var $events = $('#events');
				var $div = $("<div></div>");
				var $formInput = $("<form><input type='text' /></form>");
				$formInput.hide();
				var $liEvent = $("<li class='event'><img src='icons/pencil.png' alt='Edit'><span>" + todoTxt + "</span></li>");
				$formInput.submit(function(e) {
					e.preventDefault();
					var txt = $formInput.children("input").val();
					$liEvent.children("span").text(txt);
					$liEvent.show();
					$formInput.hide();
				});
				$div.append($liEvent);
				$div.append($formInput);
				$liEvent.on('click', function(e) {
					if($(this).hasClass(Todo.completedClass)) {
						$(this).removeClass(Todo.completedClass);
						Todo.doWhen(!Todo.existsCompleted(), Todo.hideClearCompleted);
					} else {
						$(this).addClass(Todo.completedClass);
						Todo.showClearCompleted();
					}
				}).on('click', 'img', function(e) {
					var $liItem = $(this).parent();
					var todoItemTxt = $liItem.text();
					var $todoForm = $liItem.siblings("form")
					$todoForm.show();
					$todoForm.children("input").val(todoItemTxt).focus();
					$liItem.hide();
					
					// return false so the event does not propagate to the li event handler
					return false;
				});
				$events.append($div);
				$input.val('');
			}
		});
	}
};

$(document).ready(function() {
	Todo.setup();
});
