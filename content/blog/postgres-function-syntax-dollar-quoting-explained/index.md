+++
title = "PostgreSQL Function Syntax: Demystifying Anonymous vs. Tagged Dollar-Quoting"
description = "Confused by different PostgreSQL function syntaxes? Learn the key difference between anonymous $$ and tagged $tag$ dollar-quoting and discover when to use each"
date = 2025-07-16

[extra]
+++

I am running my DB in Supabase, and one of the triggers that inserted an entry into the public table `user_metadata` on new user registration was broken and needed update:

```
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.user_metadata (user_id, plan_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
```

This is the code I had in Supabase. The issue was that we pass `plan_id`, but `user_metadata` does not have such a column, so the trigger fails.

Supabase has an AI assistant that can fix these errors for you, writing new code. Well, it simply has to remove the `plan_id`, right? Well this is what it wrote:

```
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.user_metadata (user_id)
  values (new.id);
  return new;
end;
$function$;
```

Uh?? My first though was, what is this? On a closer inspection, there is nothing to be alarmed, because the only real change is indeed getting rid of that `plan_id`

But that forced me to actually read the code 😅

I have basic SQL knowledge so I had never seen this syntax before.

Let's review what changed piece by piece:

## NUMBER 1

This

```
... language plpgsql security definer;
```

somehow moved before the inner function part

```
...
 LANGUAGE plpgsql
 SECURITY DEFINER
... the nested function
```

Oh... in SQL, clauses can switch places, it's ok. And, you know, the lowercase or uppercase for SQL syntax, it doesn't matter. SQL is not case sensitive.

So those two things are the same.

## NUMBER 2

This

```
... as $$
begin
  ... thing broken ...
end;
$$
```

Changed to this

```
...
AS $function$
begin
  ... thing fixed ...
end;
$function$;
```

Uh? What is `$$` and `$function$`. I have never seen this. So it's time to learn some syntax.

They are both "dollar-quotings", and solve the same problem, namely:

Say, you're trying to write a SQL function. Let's do it step by step:

Step 1: scaffold the function

```
CREATE FUNCTION my_func() RETURNS text LANGUAGE plpgsql AS
```

Step 2: Put the meat in

```
CREATE FUNCTION my_func() RETURNS text LANGUAGE plpgsql AS '
begin
  -- a comment with apostrophe isn''t easy to write
  return ''Hello, World!''
end;
```

Obviously, this function is super simple. Notice the single quotes around the function. Why do we have them? Well... this is SQL for you. The function body must be a string, end of story.

This forces us to quote every actual single quote in the function body, that is annoying. Also, syntax highlighters will likely show the entire body as uniform yellow, hard to read.

Here is were *DOLLAR-QUOTING* enters the stage to solve all these problems.

It basically allows us to write the function like this:

```
CREATE FUNCTION my_func() RETURNS text LANGUAGE plpgsql AS $$
begin
  -- a comment with apostrophe isn't easy to write
  return 'Hello, World!'
end;
$$
```

See, no more duped single quotes, and we get a beautiful syntax highlighting.

Now you know what dollar-quoting is. But hold on. We have seen two different versions of dollar quoting: `$$` and `$function$` . Where do they differ?

- `$$`: This is called *anonymous dollar-quoting*. It does exactly what we have seen it do right above. It helps us get rid of the single quotes around the function body.
- `$function$` : This is called *Tagged Dollar-Quoting*. And it does... it does the same! So, then what is the point? It is nesting. With anonymous dollar-quoting, you cannot nest them, because the second `$$` will ALWAYS mark the end of the first `$$`

```
... let's nest'em ... AS $$
begin
  ... do something
  AS $$ <-- here we are trying to nest a second $$, but all SQL is seeing is the closing of the first $$ :_(
  begin <-- here SQL will show a syntax error!
    ... do something else <-- this will never run!
  end;
  $$
end;
$$
```

You see how that will break? We can't nest `$$` !

But we can nest the tagged version!

```
... let's try again! ... AS $fnc_a$ <-- see we're using the tag!
begin
  ... do something
  AS $fnc_b$ <-- no tagging confusion here, we're good!
  begin 
    ... merry fucking xmas!! ...
  end;
  $fnc_b$ <-- and we close them
end;
$fnc_a$
```

---

Hopefully we are all clear about these little SQL syntax adventures

Go do some `$rock_n_roll$`!
