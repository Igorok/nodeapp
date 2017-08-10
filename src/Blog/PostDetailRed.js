let postId = window.locals.postId || null;
/*
{
	"_id" : ObjectId("56b79824a6d3b6793876be83"),
	"name" : "public post",
	"description" : "Это – перевод спецификации EcmaScript 5 с аннотациями. Исходный код доступен на https://github.com/iliakan/es5.\n\nОфициальная спецификация доступна на сайте http://www.ecma-international.org. Версия спецификации, послужившая исходной для перевода, находится на es5.github.com.\n\nЛюбое использование текста (кроме таблицы содержания) должно сопровождаться указанием копирайта ECMA и лицензии. Будет полезно также дать ссылку на этот перевод, т.к. мы будем улучшать его и поддерживать в актуальном состоянии.\n\nУлучшения и исправления вы можете присылать pull-запросом на GitHub или на e-mail: iliakan@gmail.com (Илья Кантор).\n\nДля просмотра аннотаций, следуйте по ссылкам Ⓐ, Ⓓ, Ⓡ, Ⓖ, Ⓔ, и ① в заголовках. Ключ к маркерам описывает значения аннотаций.",
	"uId" : ObjectId("5570ab064c32a55b1585d7b9"),
	"created" : ISODate("2016-02-07T19:16:52.748Z"),
	"_bId" : ObjectId("56b77dfb782fe1c328d69742"),
	"status" : "publish",
	"approved" : 1
}
*/
let initState = {
	status: null,
	error: null,
	postId: postId,
	_bId: '',
	created: '',
	user: '',
	name: '',
	description: '',
};
const postDetail = (state = initState, action) => {
	switch (action.type) {
		// detail of the blog
		case 'POST_DETAIL_SEND':
			state = {...state};
			state.status = 'send';
			return state;
		case 'POST_DETAIL_SUCCESS':
			state = {...state};
			state._bId = action.data._bId;
			state.created = action.data.created;
			state.user = action.data.user;
			state.name = action.data.name;
			state.description = action.data.description;
			state.status = 'success';
			return state;
		case 'POST_DETAIL_EROR':
			state = {...state};
			state.status = 'error';
			state.error = action.error;
			return state;
		default:
			return state;
	}
}

export default postDetail;