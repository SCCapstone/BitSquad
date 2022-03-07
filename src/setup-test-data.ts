import {Process } from 'src/app/model/process';
import { PROCESSES } from './db-data';

export function setUpProcessData() : Process[] {
  return Object.values(PROCESSES) as Process[];
}