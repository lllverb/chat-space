<!-- # README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|password|text|null: false|
### Association
- has_many :talks
- has_many :groups, through :groups_users


## talksテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|img|text||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
### Association
- has_many :users, through :groups_users
- has_many :talks


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :users
- has_many :groups