(function (module) {
	"use strict";
	
	var _ = module.parent.require('underscore'),
		async = module.parent.require('async'),
		topics = module.parent.require('./topics'),
		category = {};
	
	/**
	* Comprueba si el usuario ha participado en cada tema de la categoría
	* y setea el booleano userParticipated en la respuesta de la API
	*/
	category.categoryTopicsGet = function (data, callback) {
		async.each(data.topics, function(topic, next) {
			userParticipated(topic, data.uid, next);
		}, function(err) {
			callback(err, data);
		});
	};
	
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
	
	module.exports = category;
	
}(module));