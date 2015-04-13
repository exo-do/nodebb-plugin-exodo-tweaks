(function (module) {
	"use strict";

	var _ = module.parent.require('underscore'),
		async = module.parent.require('async'),
		moment = require('./tweaks/client/moment.min.js'),
		topics = module.parent.require('./topics'),
		user = module.parent.require('./user'),
		plugin = {};

	plugin.categoryTopicsGet = function (data, callback) {
		async.each(data.topics, function(topic, next) {
			addExtraFields(topic, data, next);
		}, function(err) {
			callback(err, data);
		});
	};

	plugin.addProfileInfo = function(profileInfo, callback) {
		moment.locale('es', { monthsShort : "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_") });
		user.getUserFields(profileInfo.uid, ['location','joindate'], function(err, data) {
			if (err) {
				return callback(err);
			}

			profileInfo.profile.push({ joindate: moment(data.joindate).format('MMM YYYY') });
			if (data.location)
				profileInfo.profile.push({ location: data.location });
			
			callback(err, profileInfo);
		});		
	};

	plugin.topicTitleNoEdit = function(post, callback)
	{
		console.log(post);
		//callback(null, post);
	}
	
	function addExtraFields(topic, data, callback) {
		async.series([
			userParticipated(topic, data.uid, callback),
			isHot(topic),
			setPagesCount(topic, data.uid)
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


	/**
	* Comprueba el número de posts por página del usuario logeado
	* y setea el pagesCount con el número de páginas del hilo
	*/
	function setPagesCount(topic, uid) {
		user.getSettings(uid, function(err, settings) {
			if (err) {
				return callback(err);
			}

			topic.pagesCount = Math.floor(topic.postcount / settings.postsPerPage)+1;
		});
	};
	
	/**
	* Comprueba el número de posts por página del usuario logeado
	* y setea el pagesCount con el número de páginas del hilo
	*/
	function setPagesCount(topic, uid) {
		user.getUserData(uid, function(err, userData) {
			
		});
	};

	module.exports = plugin;

}(module));