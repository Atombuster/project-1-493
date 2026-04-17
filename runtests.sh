#!/bin/sh

. ./curltest.sh

show_request=1

PORT=8086
URL="http://localhost:${PORT}"



# Add a business with full details
request_json "Adding business" POST $URL/businesses '{
    "name": "Pizza Palace",
    "address": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zip": "62701",
    "phone": "555-1234",
    "category": "Restaurant",
    "subcategory": "Pizza",
    "website": "https://pizzapalace.com",
    "email": "info@pizzapalace.com"
}' \
    201 '{
    "name": "Pizza Palace",
    "address": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zip": "62701",
    "phone": "555-1234",
    "category": "Restaurant",
    "subcategory": "Pizza",
    "website": "https://pizzapalace.com",
    "email": "info@pizzapalace.com"
}'

business_id=0



# Get all businesses
request_json "Get all businesses" GET $URL/businesses "" \
    200 '[{
    "name": "Pizza Palace",
    "address": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zip": "62701",
    "phone": "555-1234",
    "category": "Restaurant",
    "subcategory": "Pizza",
    "website": "https://pizzapalace.com",
    "email": "info@pizzapalace.com"
}]'



# Get single business
request_json "Get business by ID" GET $URL/businesses/$business_id "" \
    200 '{
    "name": "Pizza Palace",
    "address": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zip": "62701",
    "phone": "555-1234",
    "category": "Restaurant",
    "subcategory": "Pizza",
    "website": "https://pizzapalace.com",
    "email": "info@pizzapalace.com"
}'



# Add a review
request_json "Add review" POST $URL/businesses/$business_id/review '{
    "rating": "5",
    "price": "2",
    "text": "Amazing pizza!"
}' \
    201 '{"rating":"5","price":"2","text":"Amazing pizza!"}'




# Get reviews
request_json "Get all reviews" GET $URL/businesses/$business_id/review "" \
    200 '[{"rating":5,"price":2,"text":"Amazing pizza!"}]'



# Add a photo
request_json "Add photo" POST $URL/businesses/$business_id/photo '{
    "url": "/photos/1.jpg",
    "caption": "Our famous pepperoni pizza"
}' \
    201 '{"url":"/photos/1.jpg","caption":"Our famous pepperoni pizza"}'



# Get photo by ID (your server does NOT support GET /photo)
request_json "Get photo by ID" GET $URL/businesses/$business_id/photo/0 "" \
    200 '{"url":"/photos/1.jpg","caption":"Our famous pepperoni pizza"}'



# Modify business (your server REPLACES the object, not merges)
request_json "Update business" PUT $URL/businesses/$business_id '{
    "name": "Pizza Palace Downtown",
    "phone": "555-5678"
}' \
    200 '{"name":"Pizza Palace Downtown","phone":"555-5678"}'



# Delete business
request_json "Delete business" DELETE $URL/businesses/$business_id "" \
    200 '{"name":"Pizza Palace Downtown","phone":"555-5678"}'
