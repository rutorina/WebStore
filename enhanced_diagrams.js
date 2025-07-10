/**
 * Enhanced Draw.io Diagram Generator v4.0
 * Створює детальні діаграми відповідно до стандартів Wikipedia для DFD, BPMN 2.0, та UML Activity
 * Enhanced diagrams with proper standards compliance for academic project
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EnhancedDiagramGenerator {
    constructor() {
        this.cellCounter = 0;
    }

    generateId() {
        return `id_${++this.cellCounter}`;
    }

    escapeXml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    escapeXmlAttribute(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\n/g, '&#10;')
            .replace(/\r/g, '&#13;')
            .replace(/\t/g, '&#9;');
    }

    // Enhanced DFD with proper Wikipedia standards - Multi-level (0, 1, 2)
    createDetailedDFD() {
        // Don't reset counter - continue from previous state
        let content = '';
        
        // ===== РІВЕНЬ 0 - КОНТЕКСТНА ДІАГРАМА =====
        // Центральний процес (коло з номером) - Wikipedia DFD Standard
        const contextProcess = {
            id: this.generateId(),
            x: 600, y: 300,
            width: 220, height: 220,
            text: '0\\n\\nСистема\\nінтернет-магазину\\n"ТехноСвіт"'
        };

        content += `        <mxCell id="${contextProcess.id}" value="${this.escapeXmlAttribute(contextProcess.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=14;fontStyle=1;strokeWidth=3;" vertex="1" parent="1">
          <mxGeometry x="${contextProcess.x}" y="${contextProcess.y}" width="${contextProcess.width}" height="${contextProcess.height}" as="geometry"/>
        </mxCell>
`;

        // Зовнішні сутності (квадрати з подвійною рамкою)
        const externalEntities = [
            { id: this.generateId(), x: 100, y: 50, text: 'КЛІЄНТ' },
            { id: this.generateId(), x: 100, y: 200, text: 'АДМІНІСТРАТОР' },
            { id: this.generateId(), x: 100, y: 350, text: 'МЕНЕДЖЕР' },
            { id: this.generateId(), x: 100, y: 500, text: 'ПОСТАЧАЛЬНИК' },
            { id: this.generateId(), x: 1200, y: 50, text: 'ПЛАТІЖНА\\nСИСТЕМА' },
            { id: this.generateId(), x: 1200, y: 200, text: 'СЛУЖБА\\nДОСТАВКИ' },
            { id: this.generateId(), x: 1200, y: 350, text: 'EMAIL\\nСЕРВІС' },
            { id: this.generateId(), x: 1200, y: 500, text: 'БАНКІВСЬКА\\nСИСТЕМА' },
            { id: this.generateId(), x: 500, y: 50, text: 'СИСТЕМА\\nАНАЛІТИКИ' },
            { id: this.generateId(), x: 800, y: 50, text: 'CRM\\nСИСТЕМА' }
        ];

        externalEntities.forEach(entity => {
            content += `        <mxCell id="${entity.id}" value="${this.escapeXmlAttribute(entity.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;fontStyle=1;strokeWidth=4;align=center;" vertex="1" parent="1">
          <mxGeometry x="${entity.x}" y="${entity.y}" width="150" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Детальні потоки даних з правильними підписами
        const contextFlows = [
            // Клієнт ↔ Система
            { from: externalEntities[0].id, to: contextProcess.id, label: 'Запити каталогу\\nДані реєстрації\\nЗамовлення\\nПлатіжні дані', type: 'input' },
            { from: contextProcess.id, to: externalEntities[0].id, label: 'Каталог товарів\\nСтатус замовлення\\nЧеки\\nПовідомлення', type: 'output' },
            
            // Адміністратор ↔ Система
            { from: externalEntities[1].id, to: contextProcess.id, label: 'Дані товарів\\nОновлення цін\\nНалаштування система\\nПоліси безпеки', type: 'control' },
            { from: contextProcess.id, to: externalEntities[1].id, label: 'Звіти продажів\\nСтатистика використання\\nЛоги безпеки\\nІнвентарні звіти', type: 'output' },
            
            // Менеджер ↔ Система
            { from: externalEntities[2].id, to: contextProcess.id, label: 'Промо-акції\\nЗнижки\\nКампанії\\nКонтент', type: 'input' },
            { from: contextProcess.id, to: externalEntities[2].id, label: 'Аналітика продажів\\nПоведінка клієнтів\\nROI кампаній', type: 'output' },
            
            // Постачальник ↔ Система
            { from: externalEntities[3].id, to: contextProcess.id, label: 'Прайс-листи\\nТехнічні характеристики\\nСтатус доступності\\nЗображення товарів', type: 'input' },
            { from: contextProcess.id, to: externalEntities[3].id, label: 'Замовлення поповнення\\nПрогнози попиту\\nЗвіти продажів\\nРекламації', type: 'output' },
            
            // Платіжна система ↔ Система
            { from: contextProcess.id, to: externalEntities[4].id, label: 'Запит авторизації\\nДані платіжної картки\\nСума до списання\\nТип валюти', type: 'request' },
            { from: externalEntities[4].id, to: contextProcess.id, label: 'Код авторизації\\nСтатус транзакції\\nІдентифікатор платежу\\nПовідомлення про помилки', type: 'response' }
        ];

        // Генерація потоків з різними стилями залежно від типу
        contextFlows.forEach(flow => {
            let flowStyle = 'endArrow=classic;html=1;rounded=0;fontSize=10;labelBackgroundColor=#ffffff;strokeWidth=2;';
            
            switch(flow.type) {
                case 'input':
                    flowStyle += 'strokeColor=#82b366;';
                    break;
                case 'output':
                    flowStyle += 'strokeColor=#b85450;';
                    break;
                case 'control':
                    flowStyle += 'strokeColor=#d79b00;strokeWidth=3;';
                    break;
                case 'request':
                    flowStyle += 'strokeColor=#6c8ebf;dashed=1;';
                    break;
                case 'response':
                    flowStyle += 'strokeColor=#9673a6;dashed=1;';
                    break;
                default:
                    flowStyle += 'strokeColor=#666666;';
            }
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="${flowStyle}" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // ===== РІВЕНЬ 1 - ДЕКОМПОЗИЦІЯ ОСНОВНИХ ПРОЦЕСІВ =====
        const level1Processes = [
            { id: this.generateId(), x: 200, y: 700, text: '1\\n\\nУправління\\nкористувачами\\nта профілями', color: '#d5e8d4' },
            { id: this.generateId(), x: 400, y: 700, text: '2\\n\\nУправління\\nкаталогом\\nта інвентарем', color: '#fff2cc' },
            { id: this.generateId(), x: 600, y: 700, text: '3\\n\\nОбробка\\nзамовлень\\nта резервування', color: '#ffe6cc' },
            { id: this.generateId(), x: 800, y: 700, text: '4\\n\\nПлатіжна\\nобробка\\nта біллінг', color: '#e1d5e7' },
            { id: this.generateId(), x: 1000, y: 700, text: '5\\n\\nЛогістика\\nта управління\\nдоставкою', color: '#f8cecc' },
            { id: this.generateId(), x: 1200, y: 700, text: '6\\n\\nАналітика\\nта звітність', color: '#dae8fc' }
        ];

        level1Processes.forEach(process => {
            content += `        <mxCell id="${process.id}" value="${this.escapeXmlAttribute(process.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${process.color};strokeColor=#666666;fontSize=11;fontStyle=1;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="${process.x}" y="${process.y}" width="150" height="150" as="geometry"/>
        </mxCell>
`;
        });

        // Сховища даних (відкриті прямокутники) - Wikipedia DFD Standard
        const dataStores = [
            { id: this.generateId(), x: 150, y: 950, text: 'D1 | База користувачів', width: 200 },
            { id: this.generateId(), x: 370, y: 950, text: 'D2 | Каталог товарів', width: 200 },
            { id: this.generateId(), x: 590, y: 950, text: 'D3 | Замовлення та історія', width: 200 },
            { id: this.generateId(), x: 810, y: 950, text: 'D4 | Платіжні транзакції', width: 200 },
            { id: this.generateId(), x: 1030, y: 950, text: 'D5 | Логістичні дані', width: 200 },
            { id: this.generateId(), x: 150, y: 1050, text: 'D6 | Категорії та теги', width: 200 },
            { id: this.generateId(), x: 370, y: 1050, text: 'D7 | Кошики користувачів', width: 200 },
            { id: this.generateId(), x: 590, y: 1050, text: 'D8 | Логи системи', width: 200 },
            { id: this.generateId(), x: 810, y: 1050, text: 'D9 | Аналітичні дані', width: 200 },
            { id: this.generateId(), x: 1030, y: 1050, text: 'D10 | Конфігурація системи', width: 200 }
        ];

        dataStores.forEach(store => {
            content += `        <mxCell id="${store.id}" value="${this.escapeXmlAttribute(store.text)}" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#f5f5f5;strokeColor=#666666;fontSize=11;fontStyle=1;align=left;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="${store.x}" y="${store.y}" width="${store.width}" height="45" as="geometry"/>
        </mxCell>
`;
        });

        // ===== РІВЕНЬ 2 - ДЕТАЛЬНА ДЕКОМПОЗИЦІЯ ПРОЦЕСУ 3 =====
        const level2Processes = [
            { id: this.generateId(), x: 100, y: 1200, text: '3.1\\n\\nПрийом та\\nвалідація\\nзамовлення' },
            { id: this.generateId(), x: 300, y: 1200, text: '3.2\\n\\nПеревірка\\nдоступності\\nтоварів' },
            { id: this.generateId(), x: 500, y: 1200, text: '3.3\\n\\nРозрахунок\\nвартості та\\nподатків' },
            { id: this.generateId(), x: 700, y: 1200, text: '3.4\\n\\nРезервування\\nтоварів на\\nскладі' },
            { id: this.generateId(), x: 900, y: 1200, text: '3.5\\n\\nГенерація\\nфінального\\nзамовлення' },
            { id: this.generateId(), x: 1100, y: 1200, text: '3.6\\n\\nПідтвердження\\nта нотифікація\\nклієнта' }
        ];

        level2Processes.forEach(process => {
            content += `        <mxCell id="${process.id}" value="${this.escapeXmlAttribute(process.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=10;fontStyle=1;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="${process.x}" y="${process.y}" width="130" height="130" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки даних між процесами рівня 2
        const level2Flows = [
            { from: level2Processes[0].id, to: level2Processes[1].id, label: 'Валідовані\\nдані замовлення\\n+ ID користувача' },
            { from: level2Processes[1].id, to: level2Processes[2].id, label: 'Підтверджена\\nналяність товарів\\n+ кількість' },
            { from: level2Processes[2].id, to: level2Processes[3].id, label: 'Розрахована\\nповна вартість\\n+ податки' },
            { from: level2Processes[3].id, to: level2Processes[4].id, label: 'Зарезервовані\\nтовари + номер\\nрезервації' },
            { from: level2Processes[4].id, to: level2Processes[5].id, label: 'Фінальне\\nзамовлення\\n+ унікальний ID' }
        ];

        level2Flows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;labelBackgroundColor=#ffffff;strokeWidth=2;strokeColor=#d79b00;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // Enhanced BPMN 2.0 Diagram with proper flow types and standards
    createEnhancedBPMN() {
        // Continue ID counter from previous diagram
        let content = '';

        // Pools (учасники процесу) - BPMN 2.0 Standard
        const pools = [
            { id: this.generateId(), x: 50, y: 50, width: 1400, height: 200, text: 'Клієнт (Customer)', color: '#e1d5e7' },
            { id: this.generateId(), x: 50, y: 270, width: 1400, height: 220, text: 'Веб-система ТехноСвіт (Web System)', color: '#dae8fc' },
            { id: this.generateId(), x: 50, y: 510, width: 1400, height: 140, text: 'Платіжна система (Payment Gateway)', color: '#d5e8d4' },
            { id: this.generateId(), x: 50, y: 670, width: 1400, height: 140, text: 'Служба доставки (Shipping Service)', color: '#f8cecc' },
            { id: this.generateId(), x: 50, y: 830, width: 1400, height: 120, text: 'Склад та логістика (Warehouse)', color: '#fff2cc' }
        ];

        pools.forEach(pool => {
            content += `        <mxCell id="${pool.id}" value="${this.escapeXmlAttribute(pool.text)}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;horizontal=0;fillColor=${pool.color};strokeColor=#666666;fontSize=12;fontStyle=1;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="${pool.x}" y="${pool.y}" width="${pool.width}" height="${pool.height}" as="geometry"/>
        </mxCell>
`;
        });

        // Start Event (коло з тонкою лінією) - BPMN 2.0
        const startEvent = { id: this.generateId(), x: 120, y: 120 };
        content += `        <mxCell id="${startEvent.id}" value="Потреба\\nв товарі" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;strokeWidth=2;" vertex="1" parent="${pools[0].id}">
          <mxGeometry x="70" y="60" width="70" height="70" as="geometry"/>
        </mxCell>
`;

        // Customer Activities (Tasks)
        const customerTasks = [
            { id: this.generateId(), x: 220, y: 110, text: 'Пошук\\nтоварів\\nу каталозі', type: 'user' },
            { id: this.generateId(), x: 340, y: 110, text: 'Вибір\\nконкретного\\nтовару', type: 'user' },
            { id: this.generateId(), x: 460, y: 110, text: 'Додавання\\nв кошик', type: 'user' },
            { id: this.generateId(), x: 580, y: 110, text: 'Оформлення\\nзамовлення', type: 'user' },
            { id: this.generateId(), x: 820, y: 110, text: 'Введення\\nплатіжних\\nданих', type: 'user' },
            { id: this.generateId(), x: 1200, y: 110, text: 'Отримання\\nтовару', type: 'user' }
        ];

        customerTasks.forEach(task => {
            const taskColor = task.type === 'user' ? '#fff2cc' : '#dae8fc';
            const strokeColor = task.type === 'user' ? '#d6b656' : '#6c8ebf';
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${taskColor};strokeColor=${strokeColor};fontSize=10;strokeWidth=2;" vertex="1" parent="${pools[0].id}">
          <mxGeometry x="${task.x - pools[0].x}" y="60" width="90" height="70" as="geometry"/>
        </mxCell>
`;
        });

        // System Tasks (Service Tasks - з шестерінкою)
        const systemTasks = [
            { id: this.generateId(), x: 220, y: 340, text: 'Відображення\\nрезультатів\\nпошуку', type: 'service' },
            { id: this.generateId(), x: 340, y: 340, text: 'Показ\\nдеталей\\nтовару', type: 'service' },
            { id: this.generateId(), x: 460, y: 340, text: 'Оновлення\\nкошика', type: 'service' },
            { id: this.generateId(), x: 580, y: 340, text: 'Валідація\\nданих\\nзамовлення', type: 'service' },
            { id: this.generateId(), x: 940, y: 340, text: 'Підтвердження\\nуспішної\\nоплати', type: 'service' },
            { id: this.generateId(), x: 1060, y: 340, text: 'Створення\\nзавдання\\nдля доставки', type: 'service' },
            { id: this.generateId(), x: 1200, y: 340, text: 'Оновлення\\nстатусу\\nзамовлення', type: 'service' }
        ];

        systemTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;strokeWidth=2;" vertex="1" parent="${pools[1].id}">
          <mxGeometry x="${task.x - pools[1].x}" y="60" width="90" height="70" as="geometry"/>
        </mxCell>
`;
        });

        // Gateways (Decision Points) - ромби
        const gateways = [
            { id: this.generateId(), x: 700, y: 120, text: 'Товар\\nдоступний?', pool: 0 },
            { id: this.generateId(), x: 700, y: 350, text: 'Дані\\nвалідні?', pool: 1 }
        ];

        gateways.forEach(gateway => {
            content += `        <mxCell id="${gateway.id}" value="${this.escapeXmlAttribute(gateway.text)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=9;strokeWidth=2;" vertex="1" parent="${pools[gateway.pool].id}">
          <mxGeometry x="${700 - pools[gateway.pool].x}" y="${gateway.pool === 0 ? '50' : '50'}" width="90" height="90" as="geometry"/>
        </mxCell>
`;
        });

        // Payment Service Tasks
        const paymentTasks = [
            { id: this.generateId(), x: 820, y: 570, text: 'Авторизація\\nкартки' },
            { id: this.generateId(), x: 940, y: 570, text: 'Списання\\nкоштів' }
        ];

        paymentTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;strokeWidth=2;" vertex="1" parent="${pools[2].id}">
          <mxGeometry x="${task.x - pools[2].x}" y="40" width="90" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Shipping Tasks
        const shippingTasks = [
            { id: this.generateId(), x: 1060, y: 730, text: 'Планування\\nмаршруту' },
            { id: this.generateId(), x: 1180, y: 730, text: 'Доставка\\nклієнту' }
        ];

        shippingTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;strokeWidth=2;" vertex="1" parent="${pools[3].id}">
          <mxGeometry x="${task.x - pools[3].x}" y="40" width="90" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Warehouse Tasks
        const warehouseTasks = [
            { id: this.generateId(), x: 580, y: 890, text: 'Перевірка\\nналяності' },
            { id: this.generateId(), x: 1060, y: 890, text: 'Підготовка\\nтовару' }
        ];

        warehouseTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;strokeWidth=2;" vertex="1" parent="${pools[4].id}">
          <mxGeometry x="${task.x - pools[4].x}" y="40" width="90" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // End Event (коло з товстою лінією)
        const endEvent = { id: this.generateId() };
        content += `        <mxCell id="${endEvent.id}" value="Замовлення\\nвиконано" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;strokeWidth=4;" vertex="1" parent="${pools[0].id}">
          <mxGeometry x="1320" y="60" width="70" height="70" as="geometry"/>
        </mxCell>
`;

        // BPMN Flow Types
        const flows = [
            // Sequence Flows (суцільні стрілки)
            { from: startEvent.id, to: customerTasks[0].id, type: 'sequence', label: '' },
            { from: customerTasks[0].id, to: customerTasks[1].id, type: 'sequence', label: '' },
            { from: customerTasks[1].id, to: customerTasks[2].id, type: 'sequence', label: '' },
            { from: customerTasks[2].id, to: customerTasks[3].id, type: 'sequence', label: '' },
            { from: customerTasks[3].id, to: gateways[0].id, type: 'sequence', label: '' },
            { from: gateways[0].id, to: customerTasks[4].id, type: 'sequence', label: 'Так' },
            { from: customerTasks[4].id, to: customerTasks[5].id, type: 'sequence', label: '' },
            { from: customerTasks[5].id, to: endEvent.id, type: 'sequence', label: '' },

            // Message Flows (пунктирні стрілки між pools)
            { from: customerTasks[0].id, to: systemTasks[0].id, type: 'message', label: 'Запит пошуку' },
            { from: systemTasks[0].id, to: customerTasks[0].id, type: 'message', label: 'Результати' },
            { from: customerTasks[1].id, to: systemTasks[1].id, type: 'message', label: 'Запит деталей' },
            { from: systemTasks[1].id, to: customerTasks[1].id, type: 'message', label: 'Інформація про товар' },
            { from: customerTasks[2].id, to: systemTasks[2].id, type: 'message', label: 'Дані кошика' },
            { from: customerTasks[3].id, to: systemTasks[3].id, type: 'message', label: 'Дані замовлення' },
            { from: customerTasks[4].id, to: paymentTasks[0].id, type: 'message', label: 'Платіжні дані' },
            { from: paymentTasks[1].id, to: systemTasks[4].id, type: 'message', label: 'Підтвердження оплати' },

            // Data Association Flows (точкові лінії до даних)
            { from: systemTasks[3].id, to: warehouseTasks[0].id, type: 'data', label: 'Запит наявності' },
            { from: warehouseTasks[0].id, to: gateways[1].id, type: 'data', label: 'Статус наявності' },
            { from: systemTasks[5].id, to: shippingTasks[0].id, type: 'data', label: 'Дані доставки' },
            { from: shippingTasks[1].id, to: systemTasks[6].id, type: 'data', label: 'Статус доставки' }
        ];

        flows.forEach(flow => {
            let flowStyle = '';
            switch(flow.type) {
                case 'sequence':
                    flowStyle = 'endArrow=classic;html=1;rounded=0;strokeColor=#000000;strokeWidth=2;';
                    break;
                case 'message':
                    flowStyle = 'endArrow=classic;html=1;rounded=0;strokeColor=#6c8ebf;strokeWidth=2;dashed=1;';
                    break;
                case 'data':
                    flowStyle = 'endArrow=classic;html=1;rounded=0;strokeColor=#d79b00;strokeWidth=1;dashPattern=1 4;';
                    break;
            }
            
            flowStyle += 'fontSize=9;labelBackgroundColor=#ffffff;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="${flowStyle}" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // Enhanced UML Activity Diagram with proper structure and swimlanes
    createStructuredActivityDiagram() {
        // Continue ID counter from previous diagrams
        let content = '';

        // Initial Node (чорне коло) - UML 2.5 Standard
        const initialNode = { id: this.generateId(), x: 550, y: 50 };
        content += `        <mxCell id="${initialNode.id}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${initialNode.x}" y="${initialNode.y}" width="30" height="30" as="geometry"/>
        </mxCell>
`;

        // Swimlanes (Partitions) - UML 2.5 Standard
        const swimlanes = [
            { id: this.generateId(), x: 50, y: 120, width: 220, height: 1200, text: 'Клієнт\\n(Customer)', color: '#e1d5e7' },
            { id: this.generateId(), x: 270, y: 120, width: 220, height: 1200, text: 'Веб-інтерфейс\\n(Web Interface)', color: '#dae8fc' },
            { id: this.generateId(), x: 490, y: 120, width: 220, height: 1200, text: 'Бізнес-логіка\\n(Business Logic)', color: '#d5e8d4' },
            { id: this.generateId(), x: 710, y: 120, width: 220, height: 1200, text: 'База даних\\n(Database)', color: '#fff2cc' },
            { id: this.generateId(), x: 930, y: 120, width: 220, height: 1200, text: 'Зовнішні сервіси\\n(External Services)', color: '#f8cecc' }
        ];

        swimlanes.forEach(lane => {
            content += `        <mxCell id="${lane.id}" value="${this.escapeXmlAttribute(lane.text)}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=50;fillColor=${lane.color};strokeColor=#666666;fontSize=12;fontStyle=1;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="${lane.x}" y="${lane.y}" width="${lane.width}" height="${lane.height}" as="geometry"/>
        </mxCell>
`;
        });

        // Activities (заокруглені прямокутники) - розподілені по swimlanes
        const activities = [
            // Клієнт
            { id: this.generateId(), x: 80, y: 200, text: 'Відкрити\\nвеб-сайт', swimlane: 0, type: 'action' },
            { id: this.generateId(), x: 80, y: 320, text: 'Ввести пошуковий\\nзапит', swimlane: 0, type: 'action' },
            { id: this.generateId(), x: 80, y: 520, text: 'Переглянути\\nдеталі товару', swimlane: 0, type: 'action' },
            { id: this.generateId(), x: 80, y: 720, text: 'Додати товар\\nв кошик', swimlane: 0, type: 'action' },
            { id: this.generateId(), x: 80, y: 920, text: 'Оформити\\nзамовлення', swimlane: 0, type: 'action' },
            { id: this.generateId(), x: 80, y: 1120, text: 'Підтвердити\\nоплату', swimlane: 0, type: 'action' },
            
            // Веб-інтерфейс
            { id: this.generateId(), x: 300, y: 200, text: 'Завантажити\\nголовну сторінку', swimlane: 1, type: 'action' },
            { id: this.generateId(), x: 300, y: 320, text: 'Відобразити\\nформу пошуку', swimlane: 1, type: 'action' },
            { id: this.generateId(), x: 300, y: 420, text: 'Показати\\nрезультати пошуку', swimlane: 1, type: 'action' },
            { id: this.generateId(), x: 300, y: 520, text: 'Відобразити\\nсторінку товару', swimlane: 1, type: 'action' },
            { id: this.generateId(), x: 300, y: 720, text: 'Оновити\\nвідображення кошика', swimlane: 1, type: 'action' },
            { id: this.generateId(), x: 300, y: 820, text: 'Показати форму\\nзамовлення', swimlane: 1, type: 'action' },
            { id: this.generateId(), x: 300, y: 1020, text: 'Відобразити\\nформу оплати', swimlane: 1, type: 'action' },
            
            // Бізнес-логіка
            { id: this.generateId(), x: 520, y: 320, text: 'Обробити\\nпошуковий запит', swimlane: 2, type: 'action' },
            { id: this.generateId(), x: 520, y: 420, text: 'Фільтрувати\\nрезультати', swimlane: 2, type: 'action' },
            { id: this.generateId(), x: 520, y: 620, text: 'Перевірити\\nналяність товару', swimlane: 2, type: 'action' },
            { id: this.generateId(), x: 520, y: 720, text: 'Додати до\\nсесійного кошика', swimlane: 2, type: 'action' },
            { id: this.generateId(), x: 520, y: 820, text: 'Валідувати\\nдані замовлення', swimlane: 2, type: 'action' },
            { id: this.generateId(), x: 520, y: 920, text: 'Розрахувати\\nзагальну вартість', swimlane: 2, type: 'action' },
            { id: this.generateId(), x: 520, y: 1020, text: 'Ініціювати\\nплатіжний процес', swimlane: 2, type: 'action' },
            { id: this.generateId(), x: 520, y: 1120, text: 'Створити\\nзамовлення', swimlane: 2, type: 'action' },
            
            // База даних
            { id: this.generateId(), x: 740, y: 320, text: 'Пошук у\\nіндексах товарів', swimlane: 3, type: 'action' },
            { id: this.generateId(), x: 740, y: 420, text: 'Вибірка за\\nкритеріями', swimlane: 3, type: 'action' },
            { id: this.generateId(), x: 740, y: 520, text: 'Отримати\\nдані товару', swimlane: 3, type: 'action' },
            { id: this.generateId(), x: 740, y: 620, text: 'Перевірити\\nкількість на складі', swimlane: 3, type: 'action' },
            { id: this.generateId(), x: 740, y: 920, text: 'Розрахувати\\nподатки та знижки', swimlane: 3, type: 'action' },
            { id: this.generateId(), x: 740, y: 1120, text: 'Зберегти\\nзамовлення', swimlane: 3, type: 'action' },
            
            // Зовнішні сервіси
            { id: this.generateId(), x: 960, y: 1020, text: 'Обробити\\nплатіж', swimlane: 4, type: 'action' },
            { id: this.generateId(), x: 960, y: 1220, text: 'Надіслати\\nповідомлення', swimlane: 4, type: 'action' }
        ];

        const colors = ['#fff2cc', '#dae8fc', '#d5e8d4', '#fff2cc', '#f8cecc'];
        const strokeColors = ['#d6b656', '#6c8ebf', '#82b366', '#d6b656', '#b85450'];

        activities.forEach(activity => {
            content += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${colors[activity.swimlane]};strokeColor=${strokeColors[activity.swimlane]};fontSize=10;strokeWidth=2;" vertex="1" parent="${swimlanes[activity.swimlane].id}">
          <mxGeometry x="${activity.x - swimlanes[activity.swimlane].x}" y="${activity.y - swimlanes[activity.swimlane].y}" width="140" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Decision Nodes (ромби) - UML 2.5 Standard
        const decisionNodes = [
            { id: this.generateId(), x: 130, y: 600, text: 'Товар\\nзнайдено?', swimlane: 0 },
            { id: this.generateId(), x: 570, y: 850, text: 'Дані\\nвалідні?', swimlane: 2 },
            { id: this.generateId(), x: 1010, y: 1050, text: 'Платіж\\nуспішний?', swimlane: 4 }
        ];

        decisionNodes.forEach(decision => {
            content += `        <mxCell id="${decision.id}" value="${this.escapeXmlAttribute(decision.text)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=${colors[decision.swimlane]};strokeColor=${strokeColors[decision.swimlane]};fontSize=10;strokeWidth=2;" vertex="1" parent="${swimlanes[decision.swimlane].id}">
          <mxGeometry x="${decision.x - swimlanes[decision.swimlane].x}" y="${decision.y - swimlanes[decision.swimlane].y}" width="100" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Fork Node (чорна горизонтальна лінія) - UML 2.5
        const forkNode = { id: this.generateId(), x: 400, y: 680 };
        content += `        <mxCell id="${forkNode.id}" value="" style="shape=line;html=1;strokeWidth=8;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${forkNode.x}" y="${forkNode.y}" width="300" height="10" as="geometry"/>
        </mxCell>
`;

        // Join Node (чорна горизонтальна лінія) - UML 2.5
        const joinNode = { id: this.generateId(), x: 400, y: 1180 };
        content += `        <mxCell id="${joinNode.id}" value="" style="shape=line;html=1;strokeWidth=8;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${joinNode.x}" y="${joinNode.y}" width="300" height="10" as="geometry"/>
        </mxCell>
`;

        // Final Node (коло з білим центром) - UML 2.5
        const finalNode = { id: this.generateId(), x: 550, y: 1250 };
        content += `        <mxCell id="${finalNode.id}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=6;" vertex="1" parent="1">
          <mxGeometry x="${finalNode.x}" y="${finalNode.y}" width="40" height="40" as="geometry"/>
        </mxCell>
`;
        content += `        <mxCell id="${this.generateId()}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${finalNode.x + 10}" y="${finalNode.y + 10}" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Object Flows (пунктирні стрілки для передачі даних) - UML 2.5
        const objectFlows = [
            { from: initialNode.id, to: activities[0].id, label: '' },
            { from: activities[0].id, to: activities[6].id, label: 'HTTP запит' },
            { from: activities[1].id, to: activities[7].id, label: 'Пошуковий запит' },
            { from: activities[7].id, to: activities[13].id, label: 'Запит на обробку' },
            { from: activities[13].id, to: activities[21].id, label: 'SQL запит' },
            { from: activities[21].id, to: activities[14].id, label: 'Результати БД' },
            { from: activities[14].id, to: activities[8].id, label: 'Відфільтровані дані' },
            { from: activities[8].id, to: activities[2].id, label: 'HTML з результатами' },
            { from: decisionNodes[0].id, to: activities[3].id, label: 'Так' },
            { from: activities[3].id, to: activities[23].id, label: 'Запит деталей' },
            { from: activities[23].id, to: activities[9].id, label: 'Дані товару' },
            { from: activities[4].id, to: activities[16].id, label: 'Товар + кількість' },
            { from: activities[16].id, to: forkNode.id, label: 'Паралельна обробка' },
            { from: forkNode.id, to: activities[10].id, label: 'Оновлення UI' },
            { from: forkNode.id, to: activities[24].id, label: 'Перевірка наявності' },
            { from: activities[5].id, to: activities[17].id, label: 'Дані замовлення' },
            { from: decisionNodes[1].id, to: activities[18].id, label: 'Так' },
            { from: activities[18].id, to: activities[25].id, label: 'Розрахунок' },
            { from: activities[25].id, to: activities[19].id, label: 'Фінальна сума' },
            { from: activities[19].id, to: activities[26].id, label: 'Платіжний запит' },
            { from: decisionNodes[2].id, to: activities[20].id, label: 'Так' },
            { from: activities[20].id, to: activities[26].id, label: 'Підтвердження' },
            { from: activities[26].id, to: activities[27].id, label: 'Дані збережені' },
            { from: activities[27].id, to: joinNode.id, label: 'Email повідомлення' },
            { from: joinNode.id, to: finalNode.id, label: 'Процес завершено' }
        ];

        objectFlows.forEach(flow => {
            if (flow.from && flow.to) {
                content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;labelBackgroundColor=#ffffff;strokeWidth=2;strokeColor=#666666;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
            }
        });

        return content;
    }

    // Generate all diagrams
    generateAllDiagrams() {
        // Initialize counter once for all diagrams
        this.cellCounter = 0;
        
        const diagrams = [
            { id: 'detailed-dfd', name: 'Detailed DFD (Levels 0-2)', content: this.createDetailedDFD() },
            { id: 'enhanced-bpmn', name: 'Enhanced BPMN 2.0', content: this.createEnhancedBPMN() },
            { id: 'structured-activity', name: 'Structured Activity Diagram', content: this.createStructuredActivityDiagram() }
        ];

        let fullDrawioContent = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="Electron" agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)" type="device" etag="Enhanced-Diagrams" version="25.0.8">`;

        diagrams.forEach((diagram, index) => {
            fullDrawioContent += `
  <diagram id="page${index + 1}" name="${diagram.name}">
    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${diagram.content}
      </root>
    </mxGraphModel>
  </diagram>`;
        });

        fullDrawioContent += `
</mxfile>`;

        return fullDrawioContent;
    }
}

// Generate and save enhanced diagrams
const generator = new EnhancedDiagramGenerator();
const drawioContent = generator.generateAllDiagrams();

try {
    fs.writeFileSync(path.join(__dirname, 'Kosyanchuk_Enhanced_Detailed_Diagrams.drawio'), drawioContent, 'utf8');
    console.log('✅ Enhanced detailed diagrams successfully generated!');
    console.log('📁 File: Kosyanchuk_Enhanced_Detailed_Diagrams.drawio');
    console.log('📊 Includes:');
    console.log('   - Detailed Multi-level DFD (Levels 0, 1, 2) with Wikipedia standards');
    console.log('   - Enhanced BPMN 2.0 with proper flow types (sequence, message, data)');
    console.log('   - Structured UML Activity Diagram with swimlanes and object flows');
    console.log(`📏 File size: ${(drawioContent.length / 1024).toFixed(1)} KB`);
} catch (error) {
    console.error('❌ Error generating enhanced diagrams:', error.message);
}

export default EnhancedDiagramGenerator;
