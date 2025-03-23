# React Performance

## Before optimization

### 1. Filtering by country name

- Commited: 3.7s
- Render duration: 1.3ms
- Interactions: Country List
- <img width="638" alt="Снимок экрана 2025-03-22 в 23 21 38" src="https://github.com/user-attachments/assets/08d45d9f-d15b-4067-94da-ce0b28cc8cd4" />
- <img width="641" alt="Снимок экрана 2025-03-22 в 23 21 46" src="https://github.com/user-attachments/assets/c41f7792-27d2-4e5d-993b-c121a71d7929" />

### 2. Sorting by country name

- Commited: 3s
- Render duration: 18.6ms
- Interactions: Country List
- <img width="642" alt="Снимок экрана 2025-03-22 в 23 22 28" src="https://github.com/user-attachments/assets/c37ac84e-a5e0-4241-be81-08406ed8669d" />
- <img width="638" alt="Снимок экрана 2025-03-22 в 23 22 37" src="https://github.com/user-attachments/assets/171e938a-bcc8-460f-9274-72190d36d5b9" />

### 3. Sorting by population

- Commited: 2.9s
- Render duration: 18.9ms
- Interactions: Country List
- <img width="643" alt="Снимок экрана 2025-03-22 в 23 23 09" src="https://github.com/user-attachments/assets/dd1e00ed-6c59-40ac-a8aa-f4cc07abcec7" />
- <img width="644" alt="Снимок экрана 2025-03-22 в 23 23 22" src="https://github.com/user-attachments/assets/3171e09c-e690-41e3-90cf-7cf7c2ca2b0a" />

### 4. Filtering by region

- Commited: 6.7s
- Render duration: 6.7ms
- Interactions: Country List
- <img width="640" alt="Снимок экрана 2025-03-22 в 23 23 42" src="https://github.com/user-attachments/assets/5b605a43-a91d-4b1d-b28b-44e2d9ebc8d5" />
- <img width="640" alt="Снимок экрана 2025-03-22 в 23 23 49" src="https://github.com/user-attachments/assets/8214afd7-045c-4268-a20a-8f3285dd7bb3" />

## After optimization

### 1. Filtering by country name

- Commited: 3.1s
- Render duration: 1.3ms
- Interactions: Country List
- <img width="644" alt="Снимок экрана 2025-03-22 в 23 24 44" src="https://github.com/user-attachments/assets/5cf73200-8a20-4da0-a2f4-0aa161c4a8a5" />
- <img width="643" alt="Снимок экрана 2025-03-22 в 23 24 50" src="https://github.com/user-attachments/assets/87132f01-a368-48e0-8ac1-8d7f847d4ce1" />

### 2. Sorting by country name

- Commited: 2.1s
- Render duration: 19.3ms
- Interactions: Country List
- <img width="639" alt="Снимок экрана 2025-03-22 в 23 25 12" src="https://github.com/user-attachments/assets/cf9bb70d-89e0-4cf8-bc48-fdd1ecaee961" />
- <img width="640" alt="Снимок экрана 2025-03-22 в 23 25 17" src="https://github.com/user-attachments/assets/9159e44d-1039-48a7-8f2e-47561d7dd679" />

### 3. Sorting by population

- Commited: 1.9s
- Render duration: 19.1ms
- Interactions: Country List
- <img width="642" alt="Снимок экрана 2025-03-22 в 23 25 39" src="https://github.com/user-attachments/assets/beb8c9ec-811b-4fba-b31d-f7903716a2be" />
- <img width="639" alt="Снимок экрана 2025-03-22 в 23 25 46" src="https://github.com/user-attachments/assets/ed646ba4-5d37-4e4c-991b-d3bf6958db12" />

### 4. Filtering by region

- Commited: 6.7s
- Render duration: 6.4ms
- Interactions: Country List
- <img width="643" alt="Снимок экрана 2025-03-22 в 23 26 20" src="https://github.com/user-attachments/assets/86ffe863-67cb-45f9-b551-01afd5120f5c" />
- <img width="639" alt="Снимок экрана 2025-03-22 в 23 26 28" src="https://github.com/user-attachments/assets/7ef635dc-0983-49c2-abb7-af1abb5e756d" />
