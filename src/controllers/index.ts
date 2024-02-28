import { prisma } from '@/loaders/prisma';
import { validateRequestBody } from '@/middlewares/params-validator';
import { Router } from 'express';
import { z } from 'zod';

export const router = Router();

router.get('/', function (req, res, next) {
  res.json('Hello world!');
});

function generateShortUrl() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortUrl = '';
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortUrl += characters[randomIndex];
  }
  return shortUrl;
}

async function getUrl(shortUrl: string) {
  const result = await prisma.shortUrl.findFirst({ where: { shortUrl } });
  return result?.url;
}

router.post(
  '/create-url',
  validateRequestBody(
    z.object({
      url: z.string().url(),
    })
  ),
  async function (req, res, next) {
    const { url } = req.body;
    const shortUrl = generateShortUrl();

    await prisma.shortUrl.create({ data: { url, shortUrl } });

    res.send(shortUrl);
  }
);

router.get('/:shortUrl', async function (req, res, next) {
  const { shortUrl } = req.params;
  const url = await getUrl(shortUrl);
  if (url) {
    res.status(301).redirect(url);
  } else {
    res.status(404).send('Not found');
  }
});
