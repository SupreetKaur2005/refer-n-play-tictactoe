# refer-n-play-tictactoe
simple tictactoe website with refer earn feature


test my code by visiting:

https://refer-n-play-tictactoe-bqcq.vercel.app/

MERN STACK

Backend:
- folder: backend
- .env: copy .env.example and set MONGODB_URI
- npm install
- npm run dev (uses nodemon) or npm start

Frontend:
- folder: frontend
- copy .env.example and set REACT_APP_API_URL (e.g. http://localhost:5000/api)
- npm install
- npm start

Flow:
1. Register on the frontend (generate referral code)
2. Use another account to apply referral code (Profile -> Apply referral)
3. Play Tic-Tac-Toe vs client-side AI