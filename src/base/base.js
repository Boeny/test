window.hideElement = function(elem, remove){
	elem.removeClass('shown');
	setTimeout(function(){elem[remove ? 'remove' : 'hide']()}, 300);
};

/**
 * поочередно выполняет функции в массиве (мигает ими)
 * @param {object} o параметры:
 * @param {int(0)} count кол-во повторений
 * @param {Array} actions массив функций
 * @param {int(100)} ms задержка в мс между вызовами функций
 */
window.Blink = function(o){
	o.index = o.index || 0;
	o.actions[o.index]();
	o.index++;
	
	if (o.index == o.actions.length) o.index = 0;
	
	if (o.count > 0){
		o.count--;
		SetBreakableTimeout(o, o.ms || 100, function(){Blink(o)});
	}
};

/**
 * устанавливает задержку на выполнение функции,
 * начинает отсчет заново при повторном вызове
 * @param {object} o контейнер для хранения идентификатора setTimeout
 * @param {int} timeout задержка в мс
 * @param {function} after_timeout_func функция, которая выполнится после timeout мс
 */
window.SetBreakableTimeout = function(o, timeout, after_timeout_func){
	if (o.timeout_id) clearTimeout(o.timeout_id);
	
	if (!after_timeout_func) return;
	
	o.timeout_id = setTimeout(function(){ after_timeout_func()}, timeout || 0);
};