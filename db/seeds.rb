# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
    User.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!('users')
    Track.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!('tracks')
  
    # Seed Users

    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    3.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    # Seed Users

    Track.create!({
      name: 'song1',
      audio_url: 'song1.mp3',
      image_url: 'song1.jpeg',
      artist_id: 1
    })
    
    Track.create!({
      name: 'song2',
      audio_url: 'song2.mp3',
      image_url: 'song2.jpeg',
      artist_id: 2
    })
      
    Track.create!({
      name: 'song3',
      audio_url: 'song3.mp3',
      image_url: 'song3.jpeg',
      artist_id: 3
    })
  end