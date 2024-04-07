'use client';

import { hookstate } from '@hookstate/core';

export const isLoggedIn = hookstate(false);
export const tokenId = hookstate('');
