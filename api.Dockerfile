FROM node:10

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package.lock.json
COPY package*.json ./
RUN cd /tmp && npm install --production

RUN mkdir -p /app/backend && cp -a /tmp/node_modules /app/backend/

WORKDIR /app/backend
COPY dist/apps/backend .
RUN echo "FLAG{d1d_U_g3t_th15_5tra1ght_Aw4y_0r_d1d_U_g3t_stUck_L0l}" > api-flag.txt && echo "FLAG{jay_d0ubl3_y0u_t33_XD_LOL}" > flag.txt

RUN npm install -g pm2
ENV PORT 3333
EXPOSE 3333

CMD ["pm2", "start", "main"]
