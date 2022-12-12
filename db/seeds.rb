# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
    PlaylistItem.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!('playlist_items')
    Playlist.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!('playlists')
    Track.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!('tracks')
    User.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    # Seed Users

    User.create!(
      username: 'Demo User', 
      email: 'demo@user.com', 
      password: 'demouser'
    )
  
    4.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    # track seeds

      track1 = Track.create!(name: "Hotline Bling", artist_id: 1)
      image_file1 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/hotline_bling.jpeg')
      track1.photo.attach(io: image_file1, filename: 'hotline_bling.jpeg')
      audio_file1 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/%5BYT2mp3.info%5D+-+Drake+-+Hotline+Bling+(Official+Audio)+(320kbps)+(2).mp3')
      track1.song.attach(io: audio_file1, filename: '%5BYT2mp3.info%5D+-+Drake+-+Hotline+Bling+(Official+Audio)+(320kbps)+(2).mp3')

      track2 = Track.create!(name: "Clique", artist_id: 1)
      image_file2 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/download.jpeg')
      track2.photo.attach(io: image_file2, filename: 'hotline_bling.jpeg')
      audio_file2 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/%5BYT2mp3.info%5D+-+Kanye+West+-+Clique+ft.+Big+Sean+%26+Jay-Z+(Explicit)+(320kbps).mp3')
      track2.song.attach(io: audio_file2, filename: '%5BYT2mp3.info%5D+-+Drake+-+Hotline+Bling+(Official+Audio)+(320kbps)+(2).mp3')

      track3 = Track.create!(name: "Bound 2", artist_id: 2)
      image_file3 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/download.jpeg')
      track3.photo.attach(io: image_file3, filename: 'download.jpeg')
      audio_file3 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/%5BYT2mp3.info%5D+-+Kanye+West+-+Bound+2+(audio)+(320kbps).mp3')
      track3.song.attach(io: audio_file3, filename: '%5BYT2mp3.info%5D+-+Kanye+West+-+Bound+2+(audio)+(320kbps).mp3')

      track4 = Track.create!(name: "Waters of March", artist_id: 2)
      image_file4 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/AntonioCarlosJobim.jpeg')
      track4.photo.attach(io: image_file4, filename: 'AntonioCarlosJobim.jpeg')
      audio_file4 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/Waters+of+March++guas+de+Maro++Stereo++Elis+Regina+and+Tom+Jobim++Aguas+de+Marco+.mp3')
      track4.song.attach(io: audio_file4, filename: 'Waters+of+March++guas+de+Maro++Stereo++Elis+Regina+and+Tom+Jobim++Aguas+de+Marco+.mp3')

      track5 = Track.create!(name: "Coffee Cold", artist_id: 3)
      image_file5 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/galt-macdermot-rs.webp')
      track5.photo.attach(io: image_file5, filename: 'galt-macdermot-rs.webp')
      audio_file5 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/Galt%2BMacDermot%2B-%2BCoffee%2BCold.mp3')
      track5.song.attach(io: audio_file5, filename: 'Galt%2BMacDermot%2B-%2BCoffee%2BCold.mp3')

      track6 = Track.create!(name: "Thru Ya City", artist_id: 3)
      image_file6 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/delasoul.jpeg')
      track6.photo.attach(io: image_file6, filename: 'delasoul.jpeg')
      audio_file6 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/De+La+Soul+(featuring+DV+alias+Khrist)+Thru+ya+city.mp3')
      track6.song.attach(io: audio_file6, filename: 'De+La+Soul+(featuring+DV+alias+Khrist)+Thru+ya+city.mp3')

      track7 = Track.create!(name: "Love Her Madly", artist_id: 4)
      image_file7 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/the+doors.jpeg')
      track7.photo.attach(io: image_file7, filename: 'the+doors.jpeg')
      audio_file7 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/The+Doors+-+Love+Her+Madly.mp3')
      track7.song.attach(io: audio_file7, filename: 'The+Doors+-+Love+Her+Madly.mp3')

      track8 = Track.create!(name: "Funky Duck", artist_id: 4)
      image_file8 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/vulfpeck.jpeg')
      track8.photo.attach(io: image_file8, filename: 'vulfpeck.jpeg')
      audio_file8 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/VULFPECK_Funky_Duck.mp3')
      track8.song.attach(io: audio_file8, filename: 'VULFPECK_Funky_Duck.mp3')

      track9 = Track.create!(name: "Stoned Love", artist_id: 5)
      image_file9 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/supremes.jpeg')
      track9.photo.attach(io: image_file9, filename: 'supremes.jpeg')
      audio_file9 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/stoned_love_supremes.mp3')
      track9.song.attach(io: audio_file9, filename: 'stoned_love_supremes.mp3')

      track10 = Track.create!(name: "That's Life", artist_id: 5)
      image_file10 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/sinatra.jpeg')
      track10.photo.attach(io: image_file10, filename: 'sinatra.jpeg')
      audio_file10 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/Frank+Sinatra++Thats+Life.mp3')
      track10.song.attach(io: audio_file10, filename: 'Thats+Life+(Remastered+2008).mp3')

      #playlist seeds

      playlist1 = Playlist.create!(name: "Happy", user_id: 1)
      image_file1 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/sinatra.jpeg')
      playlist1.photo.attach(io: image_file1, filename: 'sinatra.jpeg')

      playlist2 = Playlist.create!(name: "Weekends", user_id: 1)
      image_file2 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/supremes.jpeg')
      playlist2.photo.attach(io: image_file2, filename: 'ok.jpeg')

      playlist3 = Playlist.create!(name: "Workout", user_id: 2)
      image_file3 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/download.jpeg')
      playlist3.photo.attach(io: image_file3, filename: 'download.jpeg')

      playlist4 = Playlist.create!(name: "Studying", user_id: 2)
      image_file4 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/AntonioCarlosJobim.jpeg')
      playlist4.photo.attach(io: image_file4, filename: 'AntonioCarlosJobim.jpeg')

      playlist5 = Playlist.create!(name: "Chilling", user_id: 3)
      image_file5 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/galt-macdermot-rs.webp')
      playlist5.photo.attach(io: image_file5, filename: 'galt-macdermot-rs.webp')
      
      playlist6 = Playlist.create!(name: "Good Times", user_id: 3)
      image_file6 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/delasoul.jpeg')
      playlist6.photo.attach(io: image_file6, filename: 'delasoul.jpeg')

      playlist7 = Playlist.create!(name: "Nature", user_id: 4)
      image_file7 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/the+doors.jpeg')
      playlist7.photo.attach(io: image_file7, filename: 'the+doors.jpeg')

      playlist8 = Playlist.create!(name: "Party", user_id: 4)
      image_file8 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/vulfpeck.jpeg')
      playlist8.photo.attach(io: image_file8, filename: 'vulfpeck.jpeg')

      playlist9 = Playlist.create!(name: "Out with Friend", user_id: 5)
      image_file9 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/supremes.jpeg')
      playlist9.photo.attach(io: image_file9, filename: 'supremes.jpeg')
      
      playlist10 = Playlist.create!(name: "Good Times", user_id: 5)
      image_file10 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/sinatra.jpeg')
      playlist10.photo.attach(io: image_file10, filename: 'hello.jpeg')

      #playlist_items seeds
      playlist1 = PlaylistItem.create!(playlist_id: 1, track_id: 1)
      playlist2 = PlaylistItem.create!(playlist_id: 1, track_id: 2)
      playlist3 = PlaylistItem.create!(playlist_id: 1, track_id: 3)
      playlist4 = PlaylistItem.create!(playlist_id: 2, track_id: 4)
      playlist5 = PlaylistItem.create!(playlist_id: 2, track_id: 5)
      playlist6 = PlaylistItem.create!(playlist_id: 2, track_id: 6)
      playlist7 = PlaylistItem.create!(playlist_id: 3, track_id: 7)
      playlist8 = PlaylistItem.create!(playlist_id: 3, track_id: 8)
      playlist9 = PlaylistItem.create!(playlist_id: 3, track_id: 9)
      playlist10 = PlaylistItem.create!(playlist_id: 4, track_id: 10)
      playlist11 = PlaylistItem.create!(playlist_id: 4, track_id: 1)
      playlist12 = PlaylistItem.create!(playlist_id: 4, track_id: 2)
      playlist13 = PlaylistItem.create!(playlist_id: 5, track_id: 3)
      playlist14 = PlaylistItem.create!(playlist_id: 5, track_id: 4)
      playlist15 = PlaylistItem.create!(playlist_id: 5, track_id: 5)
      playlist16 = PlaylistItem.create!(playlist_id: 6, track_id: 6)
      playlist17 = PlaylistItem.create!(playlist_id: 6, track_id: 7)
      playlist18 = PlaylistItem.create!(playlist_id: 6, track_id: 8)
      playlist19 = PlaylistItem.create!(playlist_id: 7, track_id: 9)
      playlist20 = PlaylistItem.create!(playlist_id: 7, track_id: 10)
      playlist21 = PlaylistItem.create!(playlist_id: 7, track_id: 1)
      playlist22 = PlaylistItem.create!(playlist_id: 8, track_id: 2)
      playlist23 = PlaylistItem.create!(playlist_id: 8, track_id: 3)
      playlist24 = PlaylistItem.create!(playlist_id: 8, track_id: 4)
      playlist19 = PlaylistItem.create!(playlist_id: 9, track_id: 5)
      playlist20 = PlaylistItem.create!(playlist_id: 9, track_id: 6)
      playlist21 = PlaylistItem.create!(playlist_id: 9, track_id: 6)
      playlist22 = PlaylistItem.create!(playlist_id: 10, track_id: 7)
      playlist23 = PlaylistItem.create!(playlist_id: 10, track_id: 8)
      playlist24 = PlaylistItem.create!(playlist_id: 10, track_id: 9)
end