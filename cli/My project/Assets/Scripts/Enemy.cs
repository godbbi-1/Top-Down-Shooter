using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    
    [SerializeField]

    private float moveSpeed = 10f;

    private float minY = -7;
    void Update()
    {
        // 매 프레임 호출
        transform.position += Vector3.down * moveSpeed * Time.deltaTime;
        if (transform.position.y < minY) {
            Destroy(gameObject);

        }
    }
}
