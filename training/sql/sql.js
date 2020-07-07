
/*

select * from "user"
right join "blog" on "user"."id" = "blog"."user_id"
right join "post" on "post"."blog_id" = "blog"."id"
order by "post"."id";

-----

select
"post"."id", "post"."user_id", "post"."blog_id", "post"."title", "user"."login", "user"."email"
from "post"
left join "user" on "post"."user_id" = "user"."id"
where ("post"."id", "post"."user_id") in (
	select
	max(id) max_id, user_id
	from "post"
	group by user_id
)
order by "post"."id" desc;

*/