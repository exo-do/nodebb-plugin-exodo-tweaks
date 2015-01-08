(function (module) {
	"use strict";
	
	var _ = module.parent.require('underscore'),
		async = module.parent.require('async'),
		topics = module.parent.require('./topics'),
		category = {};
	

	category.categoryTopicsGet = function (data, callback) {
		async.each(data.topics, function(topic, next) {
			addExtraFields(topic, data, next);
		}, function(err) {
			callback(err, data);
		});
	};
	
	function addExtraFields(topic, data, callback) {
		async.series([
			userParticipated(topic, data.uid, callback),
			isHot(topic)
		], function(err) {
			if (err) {
				callback(err)
			} else {
				callback();
			}
		});
	};
	
	/**
	* Comprueba si el usuario ha participado en cada tema de la categoría
	* y setea el booleano userParticipated en la respuesta de la API
	*/
	function userParticipated(topic, uid, callback) {
		topics.getUids(topic.tid, function(err, uids){
			if (err) {
				return callback(err);
			}
	
			if (!Array.isArray(uids) || !uids.length) {
				return callback();
			}
	
			topic.userParticipated = _.contains(uids, uid);
			callback();
	
		});
	};

	/**
	* Comprueba si el topic tiene más de 15 respuestas o 150 visitas
	* y setea el booleano isHot en la respuesta de la API
	*/
	function isHot(topic, callback) {				
		topic.isHot = (topic.postcount >= 15 || topic.viewcount >= 150 ? true : false);
	};
	
	module.exports = category;
	
}(module));