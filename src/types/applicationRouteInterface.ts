import type { Component } from "vue";

export interface applicationRoute{
    component:Component,
    areaLabel?:string,
    url:string
}