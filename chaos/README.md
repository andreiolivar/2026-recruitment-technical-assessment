> This question is relevant for **chaos backend**

# DevSoc Subcommittee Recruitment: Chaos Backend

***Complete as many questions as you can.***

## Question 1
You have been given a skeleton function `process_data` in the `data.rs` file.
Complete the parameters and body of the function so that given a JSON request of the form

```json
{
  "data": ["Hello", 1, 5, "World", "!"]
}
```

the handler returns the following JSON:
```json
{
  "string_len": 11,
  "int_sum": 6
}
```

Edit the `DataResponse` and `DataRequest` structs as you need.

## Question 2

### a)
Write SQL (Postgres) `CREATE` statements to create the following schema. Be sure to include foreign keys to appropriately model the relationships and, if appropriate, make relevant tables `CASCADE` upon deletion. You may enrich the tables with additional columns should you wish. To help you answer the question, a simple diagram is provided. 
![Database Schema](db_schema.png)

**Answer box:**
```sql
-- Create tables here
CREATE TABLE users (
  id INTEGER PRIMARY KEY
);

CREATE TABLE playlists (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL
);

CREATE TABLE songs (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  duration INTERVAL NOT NULL
);

CREATE TABLE playlist_songs (
  playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  song_id INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  PRIMARY KEY (playlist_id, song_id)
);
```

### b)
Using the above schema, write an SQL `SELECT` query to return all songs in a playlist in the following format, given the playlist id `676767`
```
| id  | playlist_id | title                                      | artist      | duration |
| --- | ----------- | ------------------------------------------ | ----------- | -------- |
| 4   | 676767      | Undone - The Sweater Song                  | Weezer      | 00:05:06 |
| 12  | 676767      | She Wants To Dance With Me - 2023 Remaster | Rick Astley | 00:03:18 |
| 53  | 676767      | Music                                      | underscores | 00:03:27 |
```

**Answer box:**
```sql
-- Write query here
SELECT 
  s.id,
  ps.playlist_id,
  s.title,
  s.artist,
  s.duration
FROM playlist_songs AS ps
JOIN songs AS s
  ON s.id = ps.song_id
WHERE ps.playlist_id=676767
ORDER BY s.id ASC;
```