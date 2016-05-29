require 'net/http'
require 'json'

class DouBan
  DOUBAN_AUTH_URL       = 'https://www.douban.com/service/auth2/auth'
  DOUBAN_AUTH_TOKEN_URI = 'https://www.douban.com/service/auth2/token'
  REDIRECT_URL          = 'http://localhost:4567/code/success'
  DOUBAN_APP_KEY        = '01b5a5decffefa100520f19c6ffcee30'
  DOUBAN_SECRET         = '593aed5da8b031ed'
  REDIRECT_URL_AUTH     = 'http://localhost:4567/auth/success'
  DOUBAN_USER_ME_URL    = 'https://api.douban.com/v2/user/~me'

  def DouBan::get_auth_code
    uri = URI(DOUBAN_AUTH_URL)
    params = { :redirect_uri => REDIRECT_URL, :response_type => 'code', :client_id => DOUBAN_APP_KEY }
    uri.query = URI.encode_www_form(params)
    return uri
  end


  def DouBan::get_auth_token(code)
    uri = URI(DOUBAN_AUTH_TOKEN_URI)
    params = { :client_id     => DOUBAN_APP_KEY,
               :client_secret => DOUBAN_SECRET,
               :grant_type    => 'authorization_code',
               :code          => code,
               :redirect_uri  => DOUBAN_AUTH_TOKEN_URI }

    Net::HTTP.post_form(uri, params)
  end


  def DouBan::getUserInfo
    uri = URI(DOUBAN_USER_ME_URL)
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = 'Bearer ' + File.open('token.txt', 'r').gets

    res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true ) do |http|
      http.request(req)
    end

    case res
      when Net::HTTPSuccess
        JSON.parse(res.body)
      else
        false
    end
  end
end