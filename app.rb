require 'sinatra'
require 'sinatra/json'
require 'net/https'
require './douban'
require 'sinatra/cookies'
require 'sinatra/reloader'
require 'erb'

use Rack::Session::Pool, :expire_after => 2592000
set :public_folder, File.dirname(__FILE__) + '/dist'

get '/' do

end

get '/user/me' do
  if cookies[:douban_id]
    result = DouBan.getUserInfo
    if result
      json result
    end

  else
    redirect DouBan.get_auth_code
  end
end

get '/code/success' do
  res = DouBan.get_auth_token(params[:code])
  if res.code == '200'
    body = JSON.parse(res.body)
    cookies[:douban_id] = body['douban_user_id']
    f = File.new('token.txt', 'w+')
    f.write(body['access_token'])
    f.close
    '授权成功'
  else
    '请求失败'
  end
end

get '/auth/success' do
  ''
end
